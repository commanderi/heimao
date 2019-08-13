<template>
    <div class="index">
        <div class="index_x">
            <app-head></app-head>
            <div class="con uesrcon" v-if="userInfo!=null">
                <div class="userImg"><img :src="userInfo.image"></div>
                <p>昵称：{{ userInfo.nickname }}</p>
                <p>账号：{{ userInfo.mobile }}</p>
                <p>性别：{{ userInfo.sex==1 ? '男' : '女' }}</p>
                <p>账户类型：{{ userInfo.identity==1 ? '用户' : '主播' }}</p>
                <button class="tuichu" v-on:click="signOut">退出登录</button>
            </div>
            <app-nav></app-nav>
        </div>
    </div>
</template>
<script>
import { ucenter } from '@/http/api';
export default {
    name:'my',
    data(){
        return{
            userInfo:null,
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
        signOut:function(){
            // RongIMClient.getInstance().disconnect(); //断开连接
            RongIMClient.getInstance().logout(); //退出登录
            this.changePage('/', {})
        }
    },
    // html加载完成之前执行,执行顺序：父组件-子组件
    created(){},
    // html加载完成之后执行
    mounted(){
        getucenter:{
            const loading = this.$loading();
            ucenter().then(res => {
                loading.close();
                if(res.code==1){
                    this.userInfo = res.data;
                }else{
                    this.$toast.warning(res.msg);
                }
            })
        }
    },
}
</script>


