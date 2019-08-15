<template>
    <div>
        <div class="title">
            <span v-on:click="changePage('/chat')"><i class="iconfont icon-fanhui"></i></span>
            <span style="font-size:16px">{{ target_name }}</span>
            <span><i class="iconfont icon-diandiandian"></i></span>
        </div>
        <div class="add_con liao">

        </div>
        <div class="liao_botton">
            <button><i class="iconfont icon-tupian"></i></button>
            <textarea class="text" v-model="msg"></textarea>
            <button v-on:click="seen(msg)" v-on:keyup.enter="seen(msg)">发送</button>
        </div>
    </div>
</template>
<script>
import { userInfo } from '@/http/api';
export default {
    name:'boast',
    data(){
        return{
            appkey: '8w7jv4qb836py',
            RcToken: localStorage.getItem('RcToken'),
            send_name:localStorage.getItem('userNickname'),
            // send_img:localStorage.getItem('userImage'),
            target_id:this.$route.query.id,
            target_name:this.$route.query.name,
            msg:'',
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
        // 获取指定用户信息
        getUserInfo:function(id){
            userInfo({'id':id}).then(res => {
                if(res.code==1){
                    console.log(res.data);
                }else{
                    this.$toast.warning(res.msg);
                }
            })
        },
        // 发送消息
        seen:function(data){
            const me = this;
            let msg = new RongIMLib.TextMessage({
                content: data,
                user : {
                    'sendName': me.send_name,
                    // 'sendImage':me.send_img,
                    'targetId': me.target_id,
                    'targetName': me.target_name,
                    "portrait": "https://cdn.ronghub.com/thinking-face.png"
                },
            });
            let conversationType = RongIMLib.ConversationType.PRIVATE;
            let targetId = this.target_id;  // 目标 Id
            RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
                onSuccess: function (message) {
                    console.log('发送消息成功, 信息为: ', message.content.content);
                    me.msg = '';
                },
                onError: function (errorCode) {
                    console.log('发送消息失败', errorCode);
                }
            });
        },
        // 获取指定会话
        getConversation:function(id){
            let conversationType = RongIMLib.ConversationType.PRIVATE;
            let targetId = id;
            RongIMClient.getInstance().getConversation(conversationType, targetId, {
                onSuccess: function(conversation) {
                    if (con) {
                        console.log('获取指定会话成功', conversation);
                    }
                }
            });
        },
        // 获取会话列表
        getList:function(){
            const me = this;
            let conversationTypes = [ RongIMLib.ConversationType.PRIVATE ];
            let count = 150;
            RongIMClient.getInstance().getConversationList({
                onSuccess: function(list) {
                    console.log('获取会话列表成功**', list);
                },
                onError: function(error) {
                    console.log('获取会话列表失败', error);
                }
            }, conversationTypes, count);
        },
        // 获取历史消息
        getHistoryMsg:function(){
            let conversationType = RongIMLib.ConversationType.PRIVATE;
            let targetId = this.target_id;
            let timestrap = null; // 默认传 null, 若从头开始获取历史消息, 请赋值为 0
            let count = 20;
            RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, targetId, timestrap, count, {
                onSuccess: function(list, hasMsg) {
                    console.log('获取历史消息成功', list);
                },
                onError: function(error) {
                    // 请排查：单群聊消息云存储是否开通
                    console.log('获取历史消息失败', error);
                }
            });
        },
    },
    // html加载完成之前执行,执行顺序：父组件-子组件
    created(){},
    // html加载完成之后执行
    mounted(){
        const me = this;
    },
}
</script>
