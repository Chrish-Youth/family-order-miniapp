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
  return {
    ...order,
    id: order.id || order._id || Date.now(),
    people: order.people || '1',
    remark: order.remark || '',
    cart: order.cart || [],
    totalPrice: Number(order.totalPrice || 0),
    time: order.time || ''
  }
}

async function saveOrder(order) {
  const normalizedOrder = normalizeOrder(order)
  const localOrderList = getLocalOrders()
  localOrderList.unshift(normalizedOrder)
  setLocalOrders(localOrderList)

  if (!canUseCloud()) {
    return normalizedOrder
  }

  try {
    const db = wx.cloud.database()
    const data = {
      ...normalizedOrder,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }

    const res = await db.collection(cloudConfig.collections.orders).add({
      data
    })

    return {
      ...data,
      _id: res._id
    }
  } catch (error) {
    console.warn('云端保存订单失败，已回退到本地存储', error)
    return normalizedOrder
  }
}

async function fetchOrders() {
  if (!canUseCloud()) {
    return getLocalOrders().map(normalizeOrder)
  }

  try {
    const db = wx.cloud.database()
    const res = await db
      .collection(cloudConfig.collections.orders)
      .orderBy('createdAt', 'desc')
      .limit(100)
      .get()

    const orderList = (res.data || []).map(normalizeOrder)
    setLocalOrders(orderList)
    return orderList
  } catch (error) {
    console.warn('云端读取订单失败，已回退到本地存储', error)
    return getLocalOrders().map(normalizeOrder)
  }
}

async function clearOrders() {
  wx.removeStorageSync('orderList')

  if (!canUseCloud()) {
    return
  }

  try {
    const db = wx.cloud.database()
    await db.collection(cloudConfig.collections.orders).where({}).remove()
  } catch (error) {
    console.warn('云端清空订单失败，已只清理本地缓存', error)
  }
}

module.exports = {
  saveOrder,
  fetchOrders,
  clearOrders
}
