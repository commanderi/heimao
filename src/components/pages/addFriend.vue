<template>
    <div>
        <div class="title">
            <span v-on:click="changePage($router.back(-1))"><i class="iconfont icon-fanhui"></i></span>
            <span>添加好友</span>
            <span class="iconfont"></span>
        </div>
        <div class="add_con">
            <div class="userInput">
                <i class="iconfont icon-sousuo"></i>
                <input type="text" placeholder="请输入用户ID" v-on:keyup.enter="changePage('/friendInfo',{'status':true})">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'addfriend',
    data(){
        return{

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

    },
}
</script>
