<template>
<!-- align-self:flex-end -->
    <mu-container style="width:100%;padding:0px 0px;">
        <mu-bottom-nav :value.sync="shift" color='#FF2741' @change="clickNav">
            <mu-bottom-nav-item value="1" title="聊天" icon=":iconfont icon-liaotianjilu"></mu-bottom-nav-item>
            <mu-bottom-nav-item value="2" title="好友" icon=":iconfont icon-yaoqinghaoyou"></mu-bottom-nav-item>
            <mu-bottom-nav-item value="3" title="我的" icon=":iconfont icon-wode"></mu-bottom-nav-item>
        </mu-bottom-nav>
    </mu-container>
</template>
<script>
export default {
    name:'app-nav',
    data(){
        return{
            shift: '1'
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
        clickNav:function(id){
            this.shift = id;
            this.$store.state.navStatus = id;
        }
    },
    // html加载完成之前执行,执行顺序：父组件-子组件
    created(){},
    // html加载完成之后执行
    mounted(){},
}
</script>
<style scoped>

</style>


