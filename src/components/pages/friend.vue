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
                    <li v-for="(d,i) in list" :key="i" v-on:click="changePage('/friendInfo',{'id':d.id,'name':d.nickname,'image':d.image})">
                        <div class="quntouxiang"><img :src="d.image"></div>
                        <div class="qunxiangxi"><p><span>{{ d.nickname }}</span></p></div>
                    </li>
                </ul>
            </div>
            <app-nav></app-nav>
        </div>
    </div>
</template>
<script>
import { friendList } from '@/http/api'
export default {
    name:'friend',
    data(){
        return{
            list:null,
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
        getFriendList:{
            const loading = this.$loading();
            friendList().then(res => {
                loading.close();
                if(res.code==1){
                    this.list = res.data.list;
                }else{
                    this.$toast.warning(res.msg);
                }
            })
        }
    },
}
</script>

