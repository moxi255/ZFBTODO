if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


  var AFAppX = self.AFAppX.getAppContext
    ? self.AFAppX.getAppContext().AFAppX
    : self.AFAppX;
  self.getCurrentPages = AFAppX.getCurrentPages;
  self.getApp = AFAppX.getApp;
  self.Page = AFAppX.Page;
  self.App = AFAppX.App;
  self.my = AFAppX.bridge || AFAppX.abridge;
  self.abridge = self.my;
  self.Component = AFAppX.WorkerComponent || function(){};
  self.$global = AFAppX.$global;
  self.requirePlugin = AFAppX.requirePlugin;
          

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../client/app');
require('../../client/components/add-button/add-button?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../client/pages/todos/todos?hash=82bba35dca94fb4061b5fc19aaebd266c53b14d6');
require('../../client/pages/add-todo/add-todo?hash=82bba35dca94fb4061b5fc19aaebd266c53b14d6');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}