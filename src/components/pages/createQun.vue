<template>
    <div>
        <div class="title">
            <span v-on:click="changePage($router.back(-1))"><i class="iconfont icon-fanhui"></i></span>
            <span style="padding-left:28px">发起群聊</span>
            <span class="iconfont"><button class="queding" v-on:click="createQun">确定</button></span>
        </div>
        <div class="add_con">
            <div class="serech">
                <input type="text" placeholder="请输入用户ID">
            </div>
            <div class="createQun">
                <ul>
                    <li v-for="(d,i) in list" :key="i">
                        <span><img :src="d.image"></span>
                        <span>
                            <p>{{ d.nickname }}</p>
                            <input type="checkbox" class="xuanz" v-on:click="CheckItem(d.id)">
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { friendList,createChat } from '@/http/api'
export default {
    name:'createQun',
    data(){
        return{
            checkbox:false,
            list:null,
            numArr:[],
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
        CheckItem:function(id){
            if(this.numArr.indexOf(id)===-1){
                this.numArr.push(id);
            }else{
                this.numArr.splice(this.numArr.findIndex(item=>item.id===id),1);
            }
        },
        // 创建群
        createQun:function(){
            if(this.numArr.length<1){
                this.$toast.error('请选择要拉进群的好友');
            }else{
                let arr = '';
                for (let i = 0; i < this.numArr.length; i++) {
                    arr += this.numArr[i]+',';
                }
                arr = arr.substring(0,arr.length-1);
                const loading = this.$loading();
                createChat({'ids':arr}).then(res => {
                    loading.close();
                    if(res.code==1){
                        this.list = res.data.list;
                    }else{
                        this.$toast.error(res.msg);
                    }
                })
            }
        },
    },
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
                    this.$toast.error(res.msg);
                }
            })
        }
    },
}
</script>
