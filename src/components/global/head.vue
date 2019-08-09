<template>
    <div class="title">
        <span><i :class="['iconfont',urlType=='/chat'||urlType=='/friend'||urlType=='/my' ? '' : 'icon-fanhui']"></i></span>
        <span>{{ urlType == '/chat' ? "聊天" : (urlType == '/friend' ? "好友" : "我的") }}</span>
        <span v-if="urlType=='/chat'" class="iconfont icon-qunzu" v-on:click="changePage('/createQun',{})"></span>
        <span v-else-if="urlType=='/friend'" class="iconfont icon-jia" v-on:click="addFriend"></span>
        <span v-else class="iconfont"></span>
    </div>
</template>
<script>
export default {
    name:'app-head',
    data(){
        return{
            urlType:'',
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
        // 添加好友
        addFriend:function(){
            this.changePage('/addFriend',{});
        },
    },
    // html加载完成之前执行,执行顺序：父组件-子组件
    created(){},
    // html加载完成之后执行
    mounted(){
        this.urlType = this.$route.path;
    },
}
</script>
