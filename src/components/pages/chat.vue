<template>
    <div class="index">
        <div class="index_x">
            <app-head></app-head>
            <div class="con">
                <div class="serech"><input type="text" placeholder="请输入群名称" v-model="userId"></div>
                <ul class="list_box">
                    <li v-for="(d,i) in chatroomList" :key="i" v-on:click="changePage('/boast',{'id':d.user_id,'name':d.name})">
                        <div class="quntouxiang"><img :src="d.image"></div>
                        <div class="qunxiangxi">
                            <p><span>{{ d.name }}</span><i>{{ formatTime(d.record_time,'M-D h:m:s') }}</i></p>
                            <p class="qunmsg">{{ receiveMsg }}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <app-nav></app-nav>
        </div>
    </div>
</template>
<script>
import { chatroom } from '@/http/api';
export default {
    name:'chat',
    data(){
        return{
            chatroomList: null,
            errorImg: require('../../assets/img/newfriend.png'),
            appkey: '8w7jv4qb836py',
            RcToken: localStorage.getItem('RcToken'),
            receiveMsg:'',
            userId:null,
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
                    console.log(res.data.list)
                }else{
                    this.$toast.error(res.msg);
                }
                // console.clear();
                // console.log(res);
            })
        },
        chonglian:function(){
            var callback = {
                onSuccess: function(userId) {
                    console.log('reconnect success. ' + userId);
                },
                onTokenIncorrect: function() {
                    console.log('token 无效');
                },
                onError: function(errorCode) {
                    console.log(errorcode);
                }
            };
            var config = {
                auto: true,
                url: 'cdn.ronghub.com/RongIMLib-2.2.6.min.js?d=' + Date.now(),
                rate: [100, 1000, 3000, 6000, 10000]
            };
            RongIMClient.reconnect(callback, config);
        },
        getList:function(){
            var conversationTypes = [ RongIMLib.ConversationType.PRIVATE ];
            var count = 150;
            RongIMClient.getInstance().getConversationList({
                onSuccess: function(list) {
                    console.log('获取会话列表成功', list);
                    // this.receiveMsg = list;
                },
                onError: function(error) {
                    console.log('获取会话列表失败', error);
                }
            }, conversationTypes, count);
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
        const me = this;
        this.getChatList();
        RongIMLib.RongIMClient.init(this.appkey);
        RongIMClient.connect(this.RcToken, {
            onSuccess: function(userId) {
                me.userId = userId;
                console.log('连接成功,用户id为:', userId);// 连接已成功, 此时可通过 getConversationList 获取会话列表并展示
                me.getList();
            },
            onTokenIncorrect: function() {
                console.log('连接失败, 失败原因: token 无效');
            },
            onError: function(errorCode) {
                switch (errorCode) {
                    case RongIMLib.ErrorCode.TIMEOUT:
                        console.log('连接超时');
                    break;
                    case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
                        console.log('不可接受的协议版本');
                    break;
                    case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
                        console.log('appkey 不正确');
                    break;
                    case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
                        console.log('服务器不可用');
                    break;
                    default:
                        console.log('连接失败, 失败原因: ', info);
                    break;
                }
            }
        });
        RongIMClient.setConnectionStatusListener({
            onChanged: function (status) {
                // status 标识当前连接状态
                switch (status) {
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        console.log('连接成功');
                    break;
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        console.log('正在连接');
                    break;
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        console.log('断开连接');
                    break;
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        console.log('其他设备登录, 本端被踢');
                        me.$confirm('其他设备登录,本端已下线', '提示')
                        .then(({ result }) => {
                            if (result) {
                                console.log(result+'*')
                            } else {
                                me.changePage('/', {})
                            }
                        });
                    break;
                    case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                        console.log('域名不正确, 请至开发者后台查看安全域名配置');
                    break;
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        console.log('网络不可用, 此时可调用 reconnect 进行重连');
                        me.chonglian();
                    break;
                    default:
                        console.log('连接状态为', status);
                    break;
                }
            }
        });
        RongIMClient.setOnReceiveMessageListener({
            // 接收到的消息
            onReceived: function (message) {
                me.getList();
                var messageContent = message.content;
                // 判断消息类型
                switch(message.messageType) {
                    case RongIMClient.MessageType.TextMessage: // 文字消息
                        console.log('文字消息：', messageContent.content);
                        me.receiveMsg = messageContent.content;
                    break;
                    case RongIMClient.MessageType.ImageMessage: // 图片消息
                        console.log('图片缩略图 base64', messageContent.content); 
                        console.log('原图 url', messageContent.imageUri);
                    break;
                    case RongIMClient.MessageType.HQVoiceMessage: // 音频消息
                        console.log('音频 type ', messageContent.type); // 编解码类型，默认为 aac 音频
                        console.log('音频 url', messageContent.remoteUrl); // 播放：<audio src={remoteUrl} />
                        console.log('音频 时长', messageContent.duration);
                    break;
                    case RongIMClient.MessageType.RichContentMessage: // 富文本(图文)消息
                        console.log('文本内容', messageContent.content);
                        console.log('图片 base64', messageContent.imageUri);
                        console.log('原图 url', messageContent.url);
                    break;
                    case RongIMClient.MessageType.UnknownMessage: // 未知消息
                        console.log('未知消息, 请检查消息自定义格式是否正确', message);
                    break;
                    default:
                        console.log('收到消息', message);
                    break;
                }
            }
        });
    },
}
</script>

