const cloudConfig = require('./config/cloud')

App({
  onLaunch() {
    const hasCloudCapability = !!wx.cloud
    const hasCloudEnvId = !!cloudConfig.envId

    if (!hasCloudCapability) {
      console.warn('当前基础库不支持云开发，已自动切换为本地存储模式')
      this.globalData.useCloud = false
      return
    }

    if (!hasCloudEnvId) {
      console.warn('未配置云开发环境 ID，当前使用本地存储模式')
      this.globalData.useCloud = false
      return
    }

    wx.cloud.init({
      env: cloudConfig.envId,
      traceUser: true
    })

    this.globalData.useCloud = true
    this.globalData.cloudEnvId = cloudConfig.envId
  },

  globalData: {
    useCloud: false,
    cloudEnvId: ''
  }
})
