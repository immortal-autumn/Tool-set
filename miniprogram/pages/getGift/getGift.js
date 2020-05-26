// miniprogram/pages/getGift/getGift.js
Page({

  /**
   * Page initial data
   */
  data: {
    disabled: false,
    defaultSize: "default",
    plain: false,
    loading: false,
    code: '',
    group: '',
    failedList: ''
  },

  code: function(e) {
    this.setData({
      code: e.detail.value
    })
  },

  group: function(e) {
    this.setData({
      group: e.detail.value
    })
  },

  submission: function(e) {
    wx.cloud.callFunction({
      name: 'getUsersWithGroup',
      data: {
        collectionName: 'R3List',
        group: this.data.group
      },
      success: res => {
        if (res.result.data.length == 0) {
          wx.showToast({
            title: '失败了！',
            icon: 'none'
          })
          return
        }
        let uidList = res.result.data;
        console.log(uidList);
        for (var user in uidList) {
          let uid = uidList[user].uid;
          wx.request({
            url: 'https://statistics.pandadastudio.com/player/giftCode?uid=' + uid + '&code=' + this.data.code,
            success: res => {
              console.log(res)
              if (res.data.code != 0) {
                this.setData({
                  failedList: this.data.failedList += (uid + ': ' + res.data.msg + '\n'),
                })
              }
            }
          })
        }
      },
      fail: res => {
        wx.showToast({
          title: '失败了！',
          icon: 'none'
        })
      }
    })
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