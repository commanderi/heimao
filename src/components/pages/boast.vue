<template>
    <div>
        <div class="title">
            <span v-on:click="changePage($router.back(-1))"><i class="iconfont icon-fanhui"></i></span>
            <span style="font-size:16px">幸福一家亲</span>
            <span><i class="iconfont icon-diandiandian"></i></span>
        </div>
        <div class="add_con liao">

        </div>
        <div class="liao_botton">
            <button><i class="iconfont icon-tupian"></i></button>
            <textarea class="text"></textarea>
            <button>发送</button>
        </div>
    </div>
</template>
<script>
export default {
    name:'boast',
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
