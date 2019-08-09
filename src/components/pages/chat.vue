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
                </ul>
            </div>
            <app-nav></app-nav>
        </div>
    </div>
</template>
<script>
import { chatroom } from '@/http/api'
export default {
    name:'chat',
    data(){
        return{
            chatroomList: null,
            errorImg: require('../../assets/img/newfriend.png'),
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
        // RongIMLib.RongIMClient.init(appkey, [dataAccessProvider], [options]);
        RongIMLib.RongIMClient.init('8w7jv4qb836py');
        // 连接状态监听器
        RongIMClient.setConnectionStatusListener({
            onChanged: function (status) {
                // status 标识当前连接状态
                switch (status) {
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        console.log('链接成功');
                    break;
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        console.log('正在链接');
                    break;
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        console.log('断开连接');
                    break;
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        console.log('其他设备登录');
                    break;
                    case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                        console.log('域名不正确');
                    break;
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        console.log('网络不可用');
                    break;
                }
            }
        });
        // 消息监听器
        RongIMClient.setOnReceiveMessageListener({
            // 接收到的消息
            onReceived: function (message) {
                // 判断消息类型
                switch(message.messageType){
                    case RongIMClient.MessageType.TextMessage:
                        // message.content.content => 文字内容
                        break;
                    case RongIMClient.MessageType.VoiceMessage:
                        // message.content.content => 格式为 AMR 的音频 base64
                        break;
                    case RongIMClient.MessageType.ImageMessage:
                        // message.content.content => 图片缩略图 base64
                        // message.content.imageUri => 原图 URL
                        break;
                    case RongIMClient.MessageType.LocationMessage:
                        // message.content.latiude => 纬度
                        // message.content.longitude => 经度
                        // message.content.content => 位置图片 base64
                        break;
                    case RongIMClient.MessageType.RichContentMessage:
                        // message.content.content => 文本消息内容
                        // message.content.imageUri => 图片 base64
                        // message.content.url => 原图 URL
                        break;
                    case RongIMClient.MessageType.InformationNotificationMessage:
                        // do something
                        break;
                    case RongIMClient.MessageType.ContactNotificationMessage:
                        // do something
                        break;
                    case RongIMClient.MessageType.ProfileNotificationMessage:
                        // do something
                        break;
                    case RongIMClient.MessageType.CommandNotificationMessage:
                        // do something
                        break;
                    case RongIMClient.MessageType.CommandMessage:
                        // do something
                        break;
                    case RongIMClient.MessageType.UnknownMessage:
                        // do something
                        break;
                    default:
                        // do something
                }
            }
        });
    },
}
</script>

