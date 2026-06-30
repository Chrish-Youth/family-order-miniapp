Page({
  data: {
    categories: [
      { id: 'hot', name: '荤菜系列', icon: '🍅' },
      { id: 'home', name: '家常搭配', icon: '🍱' },
      { id: 'soup', name: '汤羹系列', icon: '🥣' },
      { id: 'snack', name: '轻食小点', icon: '🍪' },
      { id: 'drink', name: '饮品系列', icon: '🍹' },
      { id: 'sweet', name: '甜品专区', icon: '🍰' }
    ],

    currentCategory: 'hot',
    dishList: [
      {
        id: 1,
        category: 'hot',
        name: '回锅肉',
        shortName: '回锅肉',
        desc: '香浓入味，适合家庭聚餐',
        price: 38,
        image: '/assets/dish-01.jpg',
        count: 0,
        isHot: true
      },
      {
        id: 2,
        category: 'hot',
        name: '可乐鸡翅',
        shortName: '可乐鸡翅',
        desc: '甜咸适中，小朋友也爱吃',
        price: 32,
        image: '/assets/dish-02.jpg',
        count: 0
      },
      {
        id: 3,
        category: 'home',
        name: '西红柿炒鸡蛋',
        shortName: '番茄炒蛋',
        desc: '经典家常菜，酸甜开胃',
        price: 18,
        image: '/assets/dish-03.jpg',
        count: 0,
        isHot: true
      },
      {
        id: 4,
        category: 'home',
        name: '青椒土豆丝',
        shortName: '土豆丝',
        desc: '清爽下饭，简单却很耐吃',
        price: 16,
        image: '/assets/dish-04.jpg',
        count: 0
      },
      {
        id: 5,
        category: 'soup',
        name: '紫菜蛋花汤',
        shortName: '蛋花汤',
        desc: '清淡暖胃，搭配热菜更合适',
        price: 12,
        image: '/assets/dish-05.jpg',
        count: 0,
        isHot: true
      },
      {
        id: 6,
        category: 'soup',
        name: '番茄豆腐汤',
        shortName: '豆腐汤',
        desc: '酸香开胃，口感柔和',
        price: 14,
        image: '/assets/dish-06.jpg',
        count: 0
      },
      {
        id: 7,
        category: 'snack',
        name: '黄金鸡米花',
        shortName: '鸡米花',
        desc: '酥香小食，边聊边吃刚刚好',
        price: 16,
        image: '/assets/dish-07.jpg',
        count: 0,
        isHot: true
      },
      {
        id: 8,
        category: 'snack',
        name: '薯条拼盘',
        shortName: '薯条拼盘',
        desc: '外脆里软，搭配主食很轻松',
        price: 15,
        image: '/assets/dish-08.jpg',
        count: 0
      },
      {
        id: 9,
        category: 'drink',
        name: '柠檬茉莉茶',
        shortName: '茉莉茶',
        desc: '清新解腻，适合搭配热菜',
        price: 12,
        image: '/assets/dish-09.jpg',
        count: 0,
        isHot: true
      },
      {
        id: 10,
        category: 'drink',
        name: '草莓酸奶昔',
        shortName: '酸奶昔',
        desc: '奶香顺滑，口感细腻清甜',
        price: 18,
        image: '/assets/dish-10.jpg',
        count: 0
      },
      {
        id: 11,
        category: 'sweet',
        name: '草莓布丁杯',
        shortName: '布丁杯',
        desc: '奶香绵密，饭后来一份很满足',
        price: 14,
        image: '/assets/dish-11.jpg',
        count: 0,
        isHot: true
      },
      {
        id: 12,
        category: 'sweet',
        name: '奶油小蛋糕',
        shortName: '小蛋糕',
        desc: '松软轻甜，适合全家分享',
        price: 20,
        image: '/assets/dish-12.jpg',
        count: 0
      },
      {
        id: 13,
        category: 'sweet',
        name: '抹茶冰淇淋球',
        shortName: '冰淇淋',
        desc: '清甜解腻，适合下午茶时光',
        price: 22,
        image: '/assets/dish-13.jpg',
        count: 0,
        isHot: true
      },
      {
        id: 14,
        category: 'snack',
        name: '奶香小面包',
        shortName: '小面包',
        desc: '松软带奶香，随手来一份刚刚好',
        price: 13,
        image: '/assets/dish-14.jpg',
        count: 0
      },
      {
        id: 15,
        category: 'hot',
        name: '糖醋里脊',
        shortName: '糖醋里脊',
        desc: '酸甜开胃，外酥里嫩很下饭',
        price: 29,
        image: '/assets/dish-01.jpg',
        count: 0,
        isHot: true
      },
      {
        id: 16,
        category: 'home',
        name: '蒜香西兰花',
        shortName: '西兰花',
        desc: '清爽脆嫩，适合搭配主菜一起吃',
        price: 17,
        image: '/assets/dish-03.jpg',
        count: 0
      },
      {
        id: 17,
        category: 'soup',
        name: '玉米排骨汤',
        shortName: '排骨汤',
        desc: '汤鲜味浓，适合一家人分享',
        price: 20,
        image: '/assets/dish-05.jpg',
        count: 0,
        isHot: true
      },
      {
        id: 18,
        category: 'drink',
        name: '蜜桃气泡饮',
        shortName: '蜜桃饮',
        desc: '果香清甜，冰镇后更解腻',
        price: 15,
        image: '/assets/dish-09.jpg',
        count: 0
      },
      {
        id: 19,
        category: 'sweet',
        name: '焦糖奶冻',
        shortName: '奶冻',
        desc: '奶香细滑，甜度轻柔不腻口',
        price: 16,
        image: '/assets/dish-11.jpg',
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
    this.restoreCartState()
    this.calculateCart()
  },

  onShow() {
    this.restoreCartState()
    this.calculateCart()
  },

  restoreCartState() {
    const savedDishList = wx.getStorageSync('menuDishList')

    if (!savedDishList || !savedDishList.length) {
      return
    }

    const dishList = this.data.dishList.map(item => {
      const savedItem = savedDishList.find(dish => dish.id === item.id)
      return savedItem ? { ...item, count: savedItem.count || 0 } : item
    })

    this.setData({ dishList })
  },

  goHome() {},

  goOrders() {
    wx.redirectTo({
      url: '/pages/orders/orders'
    })
  },

  goMy() {
    wx.redirectTo({
      url: '/pages/my/my'
    })
  },

  changeCategory(e) {
    const id = e.currentTarget.dataset.id

    this.setData({
      currentCategory: id
    })
  },

  plusCount(e) {
    const id = e.currentTarget.dataset.id

    const dishList = this.data.dishList.map(item => (
      item.id === id
        ? { ...item, count: item.count + 1 }
        : item
    ))

    this.setData({ dishList })
    wx.setStorageSync('menuDishList', dishList)
    this.calculateCart()
    this.startFlyBall(e)
  },

  minusCount(e) {
    const id = e.currentTarget.dataset.id

    const dishList = this.data.dishList.map(item => (
      item.id === id && item.count > 0
        ? { ...item, count: item.count - 1 }
        : item
    ))

    this.setData({ dishList })
    wx.setStorageSync('menuDishList', dishList)
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

    wx.setStorageSync('currentCart', cartList)
    wx.setStorageSync('currentTotalPrice', totalPrice)
  },

  startFlyBall(e) {
    const { windowWidth, windowHeight } = wx.getSystemInfoSync()

    const startX = e.detail.x || 300
    const startY = e.detail.y || 500

    const targetX = windowWidth - 84
    const targetY = windowHeight - 170

    const translateX = targetX - startX
    const translateY = targetY - startY

    const animation = wx.createAnimation({
      duration: 900,
      timingFunction: 'ease-in-out'
    })

    this.setData({
      'flyBall.show': true,
      'flyBall.x': startX,
      'flyBall.y': startY,
      'flyBall.animationData': {}
    })

    setTimeout(() => {
      animation
        .translate(24, -42)
        .scale(1.28)
        .rotate(18)
        .opacity(1)
        .step({
          duration: 180,
          timingFunction: 'ease-out'
        })

      animation
        .translate(translateX, translateY)
        .scale(0.24)
        .rotate(280)
        .opacity(0.15)
        .step({
          duration: 680,
          timingFunction: 'ease-in'
        })

      this.setData({
        'flyBall.animationData': animation.export()
      })
    }, 20)

    setTimeout(() => {
      this.setData({
        'flyBall.show': false,
        'flyBall.animationData': {}
      })
    }, 940)
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
    const dishList = this.data.dishList.map(item => ({
      ...item,
      count: 0
    }))

    this.setData({
      dishList,
      popupClosing: true
    })

    wx.setStorageSync('menuDishList', dishList)
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
    wx.setStorageSync('menuDishList', this.data.dishList)

    wx.navigateTo({
      url: '/pages/confirm/confirm'
    })
  }
})
