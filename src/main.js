// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import MuseUI from 'muse-ui';
import Loading from 'muse-ui-loading';
import Message from 'muse-ui-message';
import Toast from 'muse-ui-toast';

import Axios from 'axios'
import store from './vuex/index' // 导入vuex文件
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import 'muse-ui-message/dist/muse-ui-message.css';
import './assets/css/style.css';
import head from './components/global/head'
import nav from './components/global/nav'

Vue.component('app-head',head);
Vue.component('app-nav',nav);
Vue.prototype.$http = Axios
Vue.config.productionTip = false
Vue.use(MuseUI);
Vue.use(Toast,{
    position: 'top',               // 弹出的位置
    time: 2000,                       // 显示的时长
    closeIcon: '',               // 关闭的图标
    close: true,                      // 是否显示关闭按钮
    successIcon: '',      // 成功信息图标
    infoIcon: '',                 // 信息信息图标
    warningIcon: '',     // 提醒信息图标
    errorIcon: '' 
});
Vue.use(Message,{
    successIcon: '',                    // 成功图标
    infoIcon: '',                               // 信息图标
    warningIcon: '',                   // 提醒图标
    errorIcon: '',                           // 错误图标
    iconSize: 24,                                   // 图标大小
    width: 350,                                     // 对话框的宽度
    maxWidth: '80%',                                // 对话框最大宽度
    className: '',                                  // 对话框的样式
    okLabel: '重新登录',                                 // 对话框确定按钮文字
    cancelLabel: '取消',                             // 对话框取消按钮文字
    transition: 'scale'                             // 对话框显示的动画 'slide-left', 'slide-right', 'fade', 'scale'
  });
Vue.use(Loading);

var RongIMLib = require('../static/js/RongIMLib-2.5.0.js');  // RongIMLib 相对路径
var Protobuf = require('../static/js/protobuf-2.3.5.min.js');  // protobuf 相对路径
var RongIMClient = RongIMLib.RongIMClient;
Vue.use(RongIMClient);
/* eslint-disable no-new */
// 全局切换页面
Vue.prototype.changePage = (path,query) => {
    switch (query) {
        case 3:
            Jump(path,query);
        break;
        default:
            Jump(path,query);
        break;
    }
};
function Jump(path,query){
    setTimeout(() => {
        router.push({
            path: path,
            query: query
        });
    }, 100);
};

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
