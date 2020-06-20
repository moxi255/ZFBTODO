const MPServerless = require('@alicloud/mpserverless-sdk');
const mpServerless = new MPServerless({
  uploadFile: my.uploadFile,
  request: my.request,
  getAuthCode: my.getAuthCode,
}, {
  appId: '2021001167694360', // 小程序应用标识
  spaceId: 'db277cdd-a03f-4a1b-84f7-292c17d78c81', // 服务空间标识
  clientSecret: 'NoueHLon8V6KUVhdGGAv1w==', // 服务空间 secret key
  endpoint: 'https://api.bspapp.com' // 服务空间地址，从小程序Serverless控制台处获得
});
App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
   todos: [
    { text: 'Learning Javascript', completed: true },
    { text: 'Learning ES2016', completed: true },
    { text: 'Learning 支付宝小程序', completed: false },
  ],
  userInfo: null,
  mpServerless,
});
