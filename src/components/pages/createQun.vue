<template>
    <div>
        <div class="title">
            <span v-on:click="changePage($router.back(-1))"><i class="iconfont icon-fanhui"></i></span>
            <span style="padding-left:28px">发起群聊</span>
            <span class="iconfont"><button class="queding">确定</button></span>
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
                            <!-- <input type="checkbox" class="xuanz"> -->
                            <input type="checkbox" class="xuanz" v-on:click="CheckItem(d.id)">
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { friendList } from '@/http/api'
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
            console.log(this.numArr)
        }
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
                    console.log(res.data.list);
                }else{
                    this.$toast.error(res.msg);
                }
            })
        }
    },
}
</script>
