// miniprogram/pages/getGift/register.js
Page({

  /**
   * Page initial data
   */
  data: {
    disabled: false,
    defaultSize: "default",
    plain: false,
    loading: false,
    group: '',
    uid: '',
  },

  group: function (e) {
    this.setData({
      group: e.detail.value,
    })
  },

  uid: function(e) {
    this.setData({
      uid: e.detail.value,
    })
  },

  submission: function(e) {
    if (this.data.uid != '' && this.data.group != '') {
      wx.request({
        url: 'https://statistics.pandadastudio.com/player/simpleInfo?uid=' + this.data.uid,
        success: res => {
          console.log(res)
          if(res.data.code == '0') {
            wx.showModal({
              title: '查询成功',
              content: '名字: ' + res.data.data.name + '\r\n忍阶: ' + res.data.data.title,
              cancelText: '取消',
              confirmText: '添加',
              success: res => {
                if (res.confirm) {
                  wx.cloud.callFunction({
                    name: 'checkUID',
                    data: {
                      collectionName: 'R3List',
                      group: this.data.group,
                      uid: this.data.uid,
                    },
                    success: res => {
                      console.log(res)
                      wx.showToast({
                        title: '添加成功'
                      })
                    },
                    fail: res => {
                      wx.showToast({
                        title: '添加失败'
                      })
                    }
                  })
                }
              }
            })
          }
          else {
            wx.showToast({
              title: '用户不存在',
              icon: 'none'
            })
          }
        }
      })
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})