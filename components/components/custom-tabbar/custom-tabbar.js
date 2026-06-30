Component({
  properties: {
    current: {
      type: String,
      value: 'home'
    }
  },

  methods: {
    goHome() {
      if (this.data.current === 'home') return

      wx.redirectTo({
        url: '/pages/index/index'
      })
    },

    goOrders() {
      if (this.data.current === 'orders') return

      wx.redirectTo({
        url: '/pages/orders/orders'
      })
    },

    goMy() {
      if (this.data.current === 'my') return

      wx.redirectTo({
        url: '/pages/my/my'
      })
    }
  }
})
