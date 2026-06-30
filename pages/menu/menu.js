Page({
  data: {
    categories: [
      { id: 'hot', name: '荤菜' },
      { id: 'home', name: '家常菜' },
      { id: 'soup', name: '汤类' }
    ],

    currentCategory: 'hot',

    dishList: [
      {
        id: 1,
        category: 'hot',
        name: '回锅肉',
        desc: '香浓入味，适合家庭聚餐',
        price: 38,
        count: 0,
        isHot: true
      },
      {
        id: 2,
        category: 'hot',
        name: '可乐鸡翅',
        desc: '甜咸适中，小朋友也爱吃',
        price: 32,
        count: 0
      },
      {
        id: 3,
        category: 'home',
        name: '西红柿炒鸡蛋',
        desc: '家常经典，酸甜开胃',
        price: 18,
        count: 0,
        isHot: true
      },
      {
        id: 4,
        category: 'home',
        name: '酸辣土豆丝',
        desc: '清爽下饭，简单好吃',
        price: 16,
        count: 0
      },
      {
        id: 5,
        category: 'soup',
        name: '紫菜蛋花汤',
        desc: '清淡爽口，适合搭配主菜',
        price: 12,
        count: 0,
        isHot: true
      },
      {
        id: 6,
        category: 'soup',
        name: '番茄豆腐汤',
        desc: '酸香开胃，口感柔和',
        price: 14,
        count: 0
      }
    ],

    totalCount: 0,
    totalPrice: 0,

    showCartPopup: false,
    cartList: [],
    popupClosing: false,

    flyBall: {
      show: false,
      x: 0,
      y: 0,
      animationData: {}
    }
  },

  onLoad() {
    this.calculateCart()
  },

  changeCategory(e) {
    const id = e.currentTarget.dataset.id
    this.setData({
      currentCategory: id
    })
  },

  plusCount(e) {
    const id = e.currentTarget.dataset.id

    const dishList = this.data.dishList.map(item => {
      if (item.id === id) {
        item.count += 1
      }
      return item
    })

    this.setData({ dishList })
    this.calculateCart()
    this.startFlyBall(e)
  },

  minusCount(e) {
    const id = e.currentTarget.dataset.id

    const dishList = this.data.dishList.map(item => {
      if (item.id === id && item.count > 0) {
        item.count -= 1
      }
      return item
    })

    this.setData({ dishList })
    this.calculateCart()
  },

  calculateCart() {
    let totalCount = 0
    let totalPrice = 0
    const cartList = []

    this.data.dishList.forEach(item => {
      totalCount += item.count
      totalPrice += item.count * item.price

      if (item.count > 0) {
        cartList.push(item)
      }
    })

    this.setData({
      totalCount,
      totalPrice,
      cartList
    })
  },

  startFlyBall(e) {
    const { windowWidth, windowHeight } = wx.getSystemInfoSync()

    const startX = e.detail.x || 300
    const startY = e.detail.y || 500

    // 购物车按钮大概位置：右下角
    const targetX = windowWidth - 70
    const targetY = windowHeight - 45

    const translateX = targetX - startX
    const translateY = targetY - startY

    const animation = wx.createAnimation({
      duration: 650,
      timingFunction: 'ease-in-out'
    })

    this.setData({
      'flyBall.show': true,
      'flyBall.x': startX,
      'flyBall.y': startY,
      'flyBall.animationData': {}
    })

    setTimeout(() => {
      animation.translate(translateX, translateY).scale(0.3).opacity(0.2).step()

      this.setData({
        'flyBall.animationData': animation.export()
      })
    }, 20)

    setTimeout(() => {
      this.setData({
        'flyBall.show': false,
        'flyBall.animationData': {}
      })
    }, 700)
  },

  openCartPopup() {
    if (this.data.totalCount === 0) {
      wx.showToast({
        title: '购物车还是空的',
        icon: 'none'
      })
      return
    }

    this.setData({
      showCartPopup: true,
      popupClosing: false
    })
  },

  closeCartPopup() {
    this.setData({
      popupClosing: true
    })

    setTimeout(() => {
      this.setData({
        showCartPopup: false,
        popupClosing: false
      })
    }, 260)
  },

  clearCart() {
    const dishList = this.data.dishList.map(item => {
      item.count = 0
      return item
    })

    this.setData({
      dishList,
      popupClosing: true
    })

    this.calculateCart()

    setTimeout(() => {
      this.setData({
        showCartPopup: false,
        popupClosing: false
      })
    }, 260)
  },

  goConfirm() {
    const cart = this.data.dishList.filter(item => item.count > 0)

    if (cart.length === 0) {
      wx.showToast({
        title: '请先选菜',
        icon: 'none'
      })
      return
    }

    wx.setStorageSync('currentCart', cart)
    wx.setStorageSync('currentTotalPrice', this.data.totalPrice)

    wx.navigateTo({
      url: '/pages/confirm/confirm'
    })
  }
})