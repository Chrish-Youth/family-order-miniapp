const { saveOrder } = require('../../utils/order-store')

Page({
  data: {
    cart: [],
    totalPrice: 0,
    userName: '',
    peopleCount: '',
    remark: '',
    dishCount: 0,
    cartPreview: [],
    cartSummary: '',
    submitting: false
  },

  onLoad() {
    const cart = wx.getStorageSync('currentCart') || []
    const totalPrice = cart.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.count || 0),
      0
    )
    const dishCount = cart.reduce((sum, item) => sum + Number(item.count || 0), 0)
    const cartPreview = cart.slice(0, 3)
    const cartSummary = cart
      .slice(0, 2)
      .map(item => item.name)
      .join('、')

    this.setData({
      cart,
      totalPrice,
      dishCount,
      cartPreview,
      cartSummary
    })
  },

  onNameInput(e) {
    this.setData({
      userName: e.detail.value
    })
  },

  onPeopleInput(e) {
    this.setData({
      peopleCount: e.detail.value
    })
  },

  onRemarkInput(e) {
    this.setData({
      remark: e.detail.value
    })
  },

  async submitOrder() {
    if (this.data.submitting) {
      return
    }

    const userName = this.data.userName.trim()
    const peopleCount = this.data.peopleCount
      ? Number(this.data.peopleCount)
      : 1

    if (!this.data.cart.length) {
      wx.showToast({
        title: '购物车为空，请先选菜',
        icon: 'none'
      })
      return
    }

    if (!userName) {
      wx.showToast({
        title: '请填写点菜人',
        icon: 'none'
      })
      return
    }

    if (!Number.isInteger(peopleCount) || peopleCount <= 0) {
      wx.showToast({
        title: '请输入正确的用餐人数',
        icon: 'none'
      })
      return
    }

    this.setData({
      submitting: true
    })

    const order = {
      id: Date.now(),
      userName,
      people: String(peopleCount),
      remark: this.data.remark.trim(),
      cart: this.data.cart.map(item => ({
        ...item
      })),
      totalPrice: this.data.totalPrice,
      time: new Date().toLocaleString()
    }

    try {
      const result = await saveOrder(order)

      wx.showToast({
        title: result.synced ? '提交并同步成功' : '已保存到本机',
        icon: result.synced ? 'success' : 'none'
      })

      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/orders/orders'
        })
      }, 800)
    } catch (error) {
      this.setData({
        submitting: false
      })

      wx.showToast({
        title: '提交失败，请重试',
        icon: 'none'
      })
    }
  }
})
