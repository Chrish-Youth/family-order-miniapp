const { fetchOrders, clearOrders } = require('../../utils/order-store')

Page({
  data: {
    orderCount: 0,
    dishCount: 0,
    todayTotal: 0,
    latestOrder: null
  },

  async onShow() {
    const orderList = await fetchOrders()
    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
    const endOfToday = startOfToday + 24 * 60 * 60 * 1000
    const todayOrders = orderList.filter(
      order => order.createdAt >= startOfToday && order.createdAt < endOfToday
    )

    let dishCount = 0
    let todayTotal = 0
    todayOrders.forEach(order => {
      todayTotal += Number(order.totalPrice || 0)
      ;(order.cart || []).forEach(item => {
        dishCount += item.count || 0
      })
    })

    const latestOrder = orderList[0]
      ? {
          ...orderList[0],
          previewList: (orderList[0].cart || []).slice(0, 3),
          previewText: (orderList[0].cart || [])
            .slice(0, 2)
            .map(item => item.name)
            .join('、')
        }
      : null

    this.setData({
      orderCount: todayOrders.length,
      dishCount,
      todayTotal,
      latestOrder
    })
  },

  goHome() {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },

  goOrders() {
    wx.redirectTo({
      url: '/pages/orders/orders'
    })
  },

  goMy() {},

  clearOrderList() {
    wx.showModal({
      title: '提示',
      content: '确定要清空所有订单记录吗？',
      success: async res => {
        if (res.confirm) {
          const result = await clearOrders()

          if (result.error) {
            wx.showToast({
              title: '云端清理失败，请重试',
              icon: 'none'
            })
            await this.onShow()
            return
          }

          this.setData({
            orderCount: 0,
            dishCount: 0,
            todayTotal: 0,
            latestOrder: null
          })
          wx.showToast({
            title: result.cloudCleared ? '订单已清空' : '本地订单已清空',
            icon: 'success'
          })
        }
      }
    })
  },

  clearCartData() {
    wx.showModal({
      title: '提示',
      content: '确定要清空当前购物车数据吗？',
      success: res => {
        if (res.confirm) {
          wx.removeStorageSync('currentCart')
          wx.removeStorageSync('currentTotalPrice')
          wx.removeStorageSync('menuDishList')
          wx.showToast({
            title: '购物车已清空',
            icon: 'success'
          })
        }
      }
    })
  }
})
