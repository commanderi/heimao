<template>
    <div class="con">
        <div class="serech"><input type="text" placeholder="请输入群名称"></div>
        <ul class="list_box">
            <!-- <li v-for="(d,i) in chatroomList" :key="i" v-on:click="changePage('/boast',{'id':d.user_id,'name':d.name})">
                <div class="quntouxiang"><img :src="d.image"></div>
                <div class="qunxiangxi">
                    <p><span>{{ d.name }}</span><i>{{ formatTime(d.record_time,'M-D h:m:s') }}</i></p>
                </div>
            </li> -->
            <li v-for="(d,i) in receiveMsg" :key="i" v-on:click="changePage('/boast',{'id':d.targetId,'name':d.latestMessage.content.user.sendName==userNickname ? d.latestMessage.content.user.targetName : d.latestMessage.content.user.sendName})">
                <div class="quntouxiang"><img :src="d.latestMessage.content.user.portrait"></div>
                <div class="qunxiangxi">
                    <p><span>{{ d.latestMessage.content.user.sendName==userNickname ? d.latestMessage.content.user.targetName : d.latestMessage.content.user.sendName }}</span><i>{{ formatTime(parseInt(d.sentTime/1000),'M-D h:m:s') }}</i></p>
                    <p class="qunmsg">{{ d.latestMessage.content.content }}</p>
                </div>
            </li>
        </ul>
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
            // appkey: '8w7jv4qb836py',
            RcToken: localStorage.getItem('RcToken'),
            receiveMsg: null,
            userNickname:localStorage.getItem('userNickname'),
            // userImage:localStorage.getItem('userImage'),
        }
    },
    // computed是计算属性，也就是依赖其它的属性计算所得出最后的值
    computed:{},
    // components是声明组件
    components:{},
    // watch是去监听一个值的变化，然后执行相对应的函数
    watch:{
        '$route':'getList',
        isFollow () {
            return this.$store.state.msg;　　//需要监听的数据
        }
    },
    // 事件方法执行
    methods:{
        isFollow:function(){
            console.log(this.$store.state.msg)
        },
        // 获取聊天室列表
        getChatList:function(){
            const loading = this.$loading();
            chatroom().then(res => {
                loading.close();
                if(res.code==1){
                    this.chatroomList = res.data.list;
                }else{
                    this.$toast.error(res.msg);
                }
                this.getList();
            })
        },
        // 重新连接
        chonglian:function(){
            let callback = {
                onSuccess: function(userId) {
                    console.log('重连成功,用户id:' + userId);
                },
                onTokenIncorrect: function() {
                    console.log('token 无效');
                },
                onError: function(errorCode) {
                    console.log(errorcode);
                }
            };
            let config = {
                auto: true,
                url: 'cdn.ronghub.com/RongIMLib-2.2.6.min.js?d=' + Date.now(),
                rate: [100, 1000, 3000, 6000, 10000]
            };
            RongIMClient.reconnect(callback, config);
        },
        // 获取会话列表
        getList:function(){
            const me = this;
            let conversationTypes = [ RongIMLib.ConversationType.PRIVATE ];
            let count = 150;
            RongIMClient.getInstance().getConversationList({
                onSuccess: function(list) {
                    console.log('获取会话列表成功', list);
                    me.receiveMsg = list;
                    // me.$set(me.receiveMsg,0,list);
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
        // this.getList();
        // 消息监听器
        RongIMClient.setOnReceiveMessageListener({
            // 接收到的消息
            onReceived: function (message) {
                let messageContent = message.content;
                // 判断消息类型
                switch(message.messageType) {
                    case RongIMClient.MessageType.TextMessage: // 文字消息
                        console.log('文字消息：', messageContent.content);
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

