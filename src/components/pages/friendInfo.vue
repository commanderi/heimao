<template>
    <div>
        <div class="title">
            <span v-on:click="changePage($router.back(-1))"><i class="iconfont icon-fanhui"></i></span>
            <span>好友信息</span>
            <span class="iconfont"></span>
        </div>
        <div class="add_con">
            <div class="serechSuccess">
                <div><img src="../../assets/img/4654.png"></div>
                <div>
                    <h5>新疆阿达西O(∩_∩)O哈哈~</h5>
                    <p>ID：56456163</p>
                </div>
            </div>
            <button class="tianjia" v-if="status==true">添加好友</button>
            <button class="tianjia" v-if="status==false">发消息</button>
            <button class="delhy" v-if="status==false">删除好友</button>
        </div>
    </div>
</template>
<script>
export default {
    name:'serechSuccess',
    data(){
        return{
            status:null,
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
        this.status = this.$route.query.status;
        console.log(this.$route.query);
    },
}
</script>
