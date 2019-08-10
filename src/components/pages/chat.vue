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
// import { init } from '../../assets/js/init';
var RongIMLib = require('../../../static/js/RongIMLib-2.5.0.js')  // RongIMLib 相对路径
var Protobuf = require('../../../static/js/protobuf-2.3.5.min.js')  // protobuf 相对路径
var RongIMClient = RongIMLib.RongIMClient
RongIMClient.init('8w7jv4qb836py', null, {
    protobuf: Protobuf
})
export default {
    name:'chat',
    data(){
        return{
            chatroomList: null,
            errorImg: require('../../assets/img/newfriend.png'),
            appkey: '8w7jv4qb836py',
            token: localStorage.getItem('RcToken'),
            // RongIMLib : require('../../../static/js/RongIMLib-2.5.0.js'),  // RongIMLib 相对路径
            // Protobuf : require('../../../static/js/protobuf-2.3.5.min.js'),  // protobuf 相对路径
            // RongIMClient : RongIMLib.RongIMClient,
            navi: '',
            showDatas: [],
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
        RongIMLib.RongIMClient.init(this.appkey);
        
    },
}
</script>

