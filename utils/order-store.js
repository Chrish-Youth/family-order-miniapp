const cloudConfig = require('../config/cloud')

function getLocalOrders() {
  return wx.getStorageSync('orderList') || []
}

function setLocalOrders(orderList) {
  wx.setStorageSync('orderList', orderList)
}

function canUseCloud() {
  const app = getApp()
  return !!(
    wx.cloud &&
    cloudConfig.envId &&
    app &&
    app.globalData &&
    app.globalData.useCloud
  )
}

function normalizeOrder(order) {
  const storedTimestamp = Number(order.createdAt || order.id)
  const createdAt = Number.isFinite(storedTimestamp) ? storedTimestamp : Date.now()

  return {
    ...order,
    id: order.id || order._id || createdAt,
    people: order.people || '1',
    remark: order.remark || '',
    cart: order.cart || [],
    totalPrice: Number(order.totalPrice || 0),
    time: order.time || new Date(createdAt).toLocaleString(),
    createdAt,
    syncStatus: order.syncStatus || (order._id ? 'synced' : 'local')
  }
}

function getCloudOrderData(order) {
  const {
    _id,
    syncStatus,
    ...data
  } = normalizeOrder(order)

  return {
    ...data,
    updatedAt: Date.now()
  }
}

function isPendingOrder(order) {
  return !order._id && order.syncStatus !== 'synced'
}

function mergeOrders(cloudOrders, localOrders) {
  const orderMap = new Map()

  ;[...cloudOrders, ...localOrders].forEach(order => {
    const normalizedOrder = normalizeOrder(order)
    const key = String(normalizedOrder.id || normalizedOrder._id)

    if (!orderMap.has(key)) {
      orderMap.set(key, normalizedOrder)
    }
  })

  return Array.from(orderMap.values()).sort((a, b) => b.createdAt - a.createdAt)
}

async function saveOrder(order) {
  const normalizedOrder = normalizeOrder(order)

  if (!canUseCloud()) {
    const localOrder = {
      ...normalizedOrder,
      syncStatus: 'local'
    }
    const localOrderList = getLocalOrders()
    localOrderList.unshift(localOrder)
    setLocalOrders(localOrderList)
    return {
      order: localOrder,
      synced: false,
      storage: 'local'
    }
  }

  try {
    const db = wx.cloud.database()
    const data = getCloudOrderData(normalizedOrder)

    const res = await db.collection(cloudConfig.collections.orders).add({
      data
    })

    const savedOrder = {
      ...data,
      _id: res._id,
      syncStatus: 'synced'
    }
    const localOrderList = getLocalOrders()
    localOrderList.unshift(savedOrder)
    setLocalOrders(localOrderList)

    return {
      order: savedOrder,
      synced: true,
      storage: 'cloud'
    }
  } catch (error) {
    console.warn('云端保存订单失败，已回退到本地存储', error)
    const pendingOrder = {
      ...normalizedOrder,
      syncStatus: 'pending'
    }
    const localOrderList = getLocalOrders()
    localOrderList.unshift(pendingOrder)
    setLocalOrders(localOrderList)
    return {
      order: pendingOrder,
      synced: false,
      storage: 'local',
      error
    }
  }
}

async function syncPendingOrders(orderList) {
  const db = wx.cloud.database()
  const collection = db.collection(cloudConfig.collections.orders)
  const syncedOrders = []

  for (const order of orderList) {
    if (!isPendingOrder(order)) {
      syncedOrders.push(normalizeOrder(order))
      continue
    }

    try {
      const existing = await collection.where({ id: order.id }).limit(1).get()

      if (existing.data && existing.data.length) {
        syncedOrders.push(normalizeOrder({
          ...existing.data[0],
          syncStatus: 'synced'
        }))
        continue
      }

      const data = getCloudOrderData(order)
      const res = await collection.add({ data })
      syncedOrders.push(normalizeOrder({
        ...data,
        _id: res._id,
        syncStatus: 'synced'
      }))
    } catch (error) {
      console.warn('待同步订单补传失败，将保留在本地', error)
      syncedOrders.push({
        ...normalizeOrder(order),
        syncStatus: 'pending'
      })
    }
  }

  return syncedOrders
}

async function fetchCloudOrders() {
  const db = wx.cloud.database()
  const pageSize = 100
  const maxPages = 20
  const orderList = []

  for (let page = 0; page < maxPages; page += 1) {
    const res = await db
      .collection(cloudConfig.collections.orders)
      .orderBy('createdAt', 'desc')
      .skip(page * pageSize)
      .limit(pageSize)
      .get()

    const pageData = res.data || []
    orderList.push(...pageData)

    if (pageData.length < pageSize) {
      break
    }
  }

  return orderList
}

async function fetchOrders() {
  const localOrders = getLocalOrders().map(normalizeOrder)

  if (!canUseCloud()) {
    return localOrders
  }

  try {
    const syncedLocalOrders = await syncPendingOrders(localOrders)
    const cloudOrders = (await fetchCloudOrders()).map(order => normalizeOrder({
      ...order,
      syncStatus: 'synced'
    }))
    const pendingOrders = syncedLocalOrders.filter(isPendingOrder)
    const orderList = mergeOrders(cloudOrders, pendingOrders)
    setLocalOrders(orderList)
    return orderList
  } catch (error) {
    console.warn('云端读取订单失败，已回退到本地存储', error)
    return localOrders
  }
}

async function clearOrders() {
  wx.removeStorageSync('orderList')

  if (!canUseCloud()) {
    return {
      localCleared: true,
      cloudCleared: false,
      storage: 'local'
    }
  }

  try {
    const db = wx.cloud.database()
    const orderList = await fetchCloudOrders()

    for (const order of orderList) {
      await db.collection(cloudConfig.collections.orders).doc(order._id).remove()
    }

    return {
      localCleared: true,
      cloudCleared: true,
      storage: 'cloud'
    }
  } catch (error) {
    console.warn('云端清空订单失败，已只清理本地缓存', error)
    return {
      localCleared: true,
      cloudCleared: false,
      storage: 'local',
      error
    }
  }
}

module.exports = {
  saveOrder,
  fetchOrders,
  clearOrders
}
