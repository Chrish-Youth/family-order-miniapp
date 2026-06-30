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

    let dishCount = 0
    let todayTotal = 0
    orderList.forEach(order => {
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
      orderCount: orderList.length,
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
          await clearOrders()
          this.setData({
            orderCount: 0,
            dishCount: 0,
            todayTotal: 0,
            latestOrder: null
          })
          wx.showToast({
            title: '订单已清空',
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
