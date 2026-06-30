const { fetchOrders } = require('../../utils/order-store')

function buildOrderViewModel(order) {
  const cart = order.cart || []
  const dishTotal = cart.reduce((sum, dish) => sum + Number(dish.count || 0), 0)
  const previewList = cart.slice(0, 3)
  const dishSummary = cart
    .slice(0, 2)
    .map(dish => dish.name)
    .join('、')

  return {
    ...order,
    cart,
    dishTotal,
    previewList,
    dishSummary,
    moreDishCount: Math.max(cart.length - previewList.length, 0)
  }
}

Page({
  data: {
    orderList: [],
    todayTotal: 0
  },

  async onShow() {
    const orderList = (await fetchOrders()).map(buildOrderViewModel)
    const todayTotal = orderList.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0)

    this.setData({
      orderList,
      todayTotal
    })
  },

  goHome() {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },

  goOrders() {},

  goMy() {
    wx.redirectTo({
      url: '/pages/my/my'
    })
  }
})
