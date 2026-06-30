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
    const totalPrice = wx.getStorageSync('currentTotalPrice') || 0
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

    if (!this.data.userName) {
      wx.showToast({
        title: '请填写点菜人',
        icon: 'none'
      })
      return
    }

    this.setData({
      submitting: true
    })

    const order = {
      id: Date.now(),
      userName: this.data.userName,
      people: this.data.peopleCount || '1',
      remark: this.data.remark,
      cart: this.data.cart.map(item => ({
        ...item
      })),
      totalPrice: this.data.totalPrice,
      time: new Date().toLocaleString()
    }

    try {
      await saveOrder(order)

      wx.showToast({
        title: '提交成功',
        icon: 'success'
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
