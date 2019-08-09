<template>
    <div class="index">
        <div class="index_x">
            <app-head></app-head>
            <div class="con">
                <div class="serech"><input type="text" placeholder="请输入好友昵称"></div>
                <ul class="list_box">
                    <li v-on:click="changePage('/reception')">
                        <div class="quntouxiang"><img src="../../assets/img/newfriend.png"></div>
                        <div class="qunxiangxi">
                            <p><span>新的朋友</span></p>
                        </div>
                    </li>
                </ul>
                <ul class="list_box">
                    <li v-for="(d,i) in 20" :key="i" v-on:click="changePage('/friendInfo',{'status':false})">
                        <div class="quntouxiang"><img src="../../assets/img/4654.png"></div>
                        <div class="qunxiangxi">
                            <p><span>叶落浮生</span><i>14:12</i></p>
                            <p class="qunmsg">还在测试中呢</p>
                        </div>
                    </li>
                </ul>
            </div>
            <app-nav></app-nav>
        </div>
    </div>
</template>
<script>
export default {
    name:'friend',
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

