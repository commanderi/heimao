<template>
    <div>
        <div class="title">
            <span v-on:click="changePage($router.back(-1))"><i class="iconfont icon-fanhui"></i></span>
            <span>好友信息</span>
            <span class="iconfont"></span>
        </div>
        <div class="add_con">
            <div class="serechSuccess">
                <div><img :src="$route.query.image"></div>
                <div>
                    <h5>{{ $route.query.name }}</h5>
                    <p>ID：{{ $route.query.id }}</p>
                </div>
            </div>
            <!-- <button class="tianjia" v-if="status==true">添加好友</button> -->
            <button class="tianjia" v-on:click="changePage('/boast',{'id':$route.query.id,'name':$route.query.name,'image':$route.query.image})">发消息</button>
            <button class="delhy" v-on:click="deleteFriend($route.query.id)">删除好友</button>
        </div>
    </div>
</template>
<script>
import { delFriend } from '@/http/api';
export default {
    name:'serechSuccess',
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
    methods:{
        // 删除好友
        deleteFriend:function(id){
            const loading = this.$loading();
            delFriend({'id':id}).then(res => {
                loading.close();
                if(res.code==1){
                    this.$toast.success(res.msg);
                    setTimeout(() => {
                        this.changePage(this.$router.back(-1))                        
                    }, 800);
                }else{
                    this.$toast.error(res.msg);
                }
            })
        }
    },
    // html加载完成之前执行,执行顺序：父组件-子组件
    created(){},
    // html加载完成之后执行
    mounted(){
        // console.log(this.$route.query);
    },
}
</script>
