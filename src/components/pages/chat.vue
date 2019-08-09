<template>
    <div class="index">
        <div class="index_x">
            <app-head></app-head>
            <div class="con">
                <div class="serech"><input type="text" placeholder="请输入群名称"></div>
                <ul class="list_box">
                    <li v-for="(d,i) in chatroomList" :key="i" v-on:click="changePage('/boast',{})">
                        <div class="quntouxiang"><img :src="d.image"></div>
                        <div class="qunxiangxi">
                            <p><span>{{ d.name }}</span><i>{{ formatTime(d.record_time,'M-D h:m:s') }}</i></p>
                            <p class="qunmsg">Bob：还在测试中呢</p>
                        </div>
                    </li>
                    <p v-for="data in showDatas" v-bind:key="data">
                        {{data}}
                    </p>
                </ul>
            </div>
            <app-nav></app-nav>
        </div>
    </div>
</template>
<script>
import { chatroom } from '@/http/api';
var RongIMLib = require('../../../static/js/RongIMLib-2.5.0.js')
var Protobuf = require('../../../static/js/protobuf-2.3.5.min.js')
// var RongIMEmoji = require('../../static/js/RongEmoji-2.2.7.js')
var RongIMClient = RongIMLib.RongIMClient
function init (params, addPromptInfo) {
    var appkey = params.appkey
    var token = params.token
    var navi = params.navi
    var config = {
        protobuf: Protobuf
    }
    if (navi) {
        config.navi = navi
    }
    RongIMClient.init(appkey, null, config)
    RongIMClient.setConnectionStatusListener({
        onChanged: function (status) {
            switch (status) {
                case RongIMLib.ConnectionStatus['CONNECTED']:
                case 0:
                    addPromptInfo('连接成功')
                break
                case RongIMLib.ConnectionStatus['CONNECTING']:
                case 1:
                    addPromptInfo('连接中')
                break
                case RongIMLib.ConnectionStatus['DISCONNECTED']:
                case 2:
                    addPromptInfo('当前用户主动断开链接')
                break
                case RongIMLib.ConnectionStatus['NETWORK_UNAVAILABLE']:
                case 3:
                    addPromptInfo('网络不可用')
                break
                case RongIMLib.ConnectionStatus['CONNECTION_CLOSED']:
                case 4:
                    addPromptInfo('未知原因，连接关闭')
                break
                case RongIMLib.ConnectionStatus['KICKED_OFFLINE_BY_OTHER_CLIENT']:
                case 6:
                    addPromptInfo('用户账户在其他设备登录，本机会被踢掉线')
                break
                case RongIMLib.ConnectionStatus['DOMAIN_INCORRECT']:
                case 12:
                    addPromptInfo('当前运行域名错误，请检查安全域名配置')
                break
            }
        }
    })
    RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息
        onReceived: function (message) {
            addPromptInfo('新消息 ' + message.targetId + ':' + JSON.stringify(message))
        }
    })
    RongIMClient.connect(token, {
        onSuccess: function(userId) {
            console.log('连接成功,用户id：' + userId);
        },
        onTokenIncorrect: function() {
            this.$toast.error('token 无效');
        },
        onError: function(errorCode){
            switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                    this.$toast.error('超时');
                break;
                case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
                    this.$toast.error('不可接受的协议版本');
                break;
                case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
                    this.$toast.error('appkey不正确');
                break;
                case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
                    this.$toast.error('服务器不可用');
                break;
            }
        }
    },null)
}
export default {
    name:'chat',
    data(){
        return{
            chatroomList: null,
            errorImg: require('../../assets/img/newfriend.png'),
            appkey: '8w7jv4qb836py',
            token: localStorage.getItem('RcToken'),
            navi: '',
            showDatas: []
        }
    },
    // computed是计算属性，也就是依赖其它的属性计算所得出最后的值
    computed:{},
    // components是声明组件
    components:{},
    // watch是去监听一个值的变化，然后执行相对应的函数
    watch:{},
    // 事件方法执行
    methods:{
        // 获取聊天室列表
        getChatList:function(){
            const loading = this.$loading();
            chatroom().then(res => {
                loading.close();
                if(res.code==1){
                    this.chatroomList = res.data.list;
                }else{
                    this.$toast.warning(res.msg);
                }
                // console.clear();
                console.log(res);
            })
        },

        addPromptInfo: function (prompt) {
            this.showDatas.push(prompt)
        },
        init: function () {
            var appkey = this.appkey;
            var token = this.token;
            if (!appkey || !token) {
                this.$toast.warning('appkey 和 token 不能为空')
            } else {
                init({appkey: appkey,token: token,navi: this.navi}, this.addPromptInfo)
            }
        },

        formatTime:function(number,format){
            var formateArr = ['Y','M','D','h','m','s'];
            var returnArr = [];
            var date = new Date(number * 1000);
            returnArr.push(date.getFullYear());
            returnArr.push(this.formatNumber(date.getMonth() + 1));
            returnArr.push(this.formatNumber(date.getDate()));
            returnArr.push(this.formatNumber(date.getHours()));
            returnArr.push(this.formatNumber(date.getMinutes()));
            returnArr.push(this.formatNumber(date.getSeconds()));
            for (var i in returnArr){
                format = format.replace(formateArr[i], returnArr[i]);
            }
            return format;
        },
        //数据转化
        formatNumber:function(n){
            n = n.toString();
            return n[1] ? n : '0' + n;
        }
    },
    // html加载完成之前执行,执行顺序：父组件-子组件
    created(){},
    // html加载完成之后执行
    mounted(){
        this.getChatList();
        this.init(); //初始化融云,并连接融云服务器
    },
}
</script>

