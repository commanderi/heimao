<template>
<!-- align-self:flex-end -->
    <mu-container style="width:100%;padding:0px 0px;">
        <mu-bottom-nav :value.sync="shift" color='#FF2741'>
            <mu-bottom-nav-item value="/chat" title="聊天" to="/chat" icon=":iconfont icon-liaotianjilu"></mu-bottom-nav-item>
            <mu-bottom-nav-item value="/friend" title="好友" to="/friend" icon=":iconfont icon-yaoqinghaoyou"></mu-bottom-nav-item>
            <mu-bottom-nav-item value="/my" title="我的" to="/my" icon=":iconfont icon-wode"></mu-bottom-nav-item>
        </mu-bottom-nav>
    </mu-container>
</template>
<script>
export default {
    name:'app-nav',
    data(){
        return{
            shift: ''
        }
    },
    // computed是计算属性，也就是依赖其它的属性计算所得出最后的值
    computed:{},
    // components是声明组件
    components:{},
    // watch是去监听一个值的变化，然后执行相对应的函数
    watch:{},
    // 事件方法执行
    methods:{},
    // html加载完成之前执行,执行顺序：父组件-子组件
    created(){},
    // html加载完成之后执行
    mounted(){
        this.shift = this.$route.path;
    },
}
</script>
<style scoped>

</style>


