<template>
    <div>
        <div class="title">
            <span v-on:click="changePage($router.back(-1))"><i class="iconfont icon-fanhui"></i></span>
            <span style="padding-left:28px">发起群聊</span>
            <span class="iconfont"><button class="queding">确定</button></span>
        </div>
        <div class="add_con">
            <div class="serech">
                <input type="text" placeholder="请输入用户ID" v-on:keyup.enter="changePage('/friendInfo',{'status':true})">
            </div>
            <div class="createQun">
                <ul>
                    <li v-for="(d,i) in 20" :key="i">
                        <span><img src="../../assets/img/qrCode.png"></span>
                        <span>
                            <p>新疆阿达西</p>
                            <mu-flex class="select-control-row">
                                <mu-checkbox v-model="checkbox" color='#FF2741'></mu-checkbox>
                            </mu-flex>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'createQun',
    data(){
        return{
            checkbox:false
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
