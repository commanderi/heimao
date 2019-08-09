<template>
    <div class="index">
        <div class="index_x">
            <app-head></app-head>
            <div class="con">
                <p class="u_id">昵称：一号客服</p>
                <button class="tuichu">退出登录</button>
            </div>
            <app-nav></app-nav>
        </div>
    </div>
</template>
<script>
export default {
    name:'my',
    data(){
        return{}
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
    mounted(){},
}
</script>


