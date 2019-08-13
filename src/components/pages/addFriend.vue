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
                <input type="text" placeholder="请输入昵称或ID。按enter键搜索" v-on:keyup.enter="search(searchValue)" v-model="searchValue">
            </div>
            <div class="youBox">
                <ul>
                    <li v-for="(d,i) in list" :key="i">
                        <span><img :src="d.image"></span>
                        <span>
                            <p>{{ d.nickname }}</p>
                            <button v-on:click="addFriend(d.id)">添加</button>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { searchUser,addBook } from '@/http/api';
export default {
    name:'addfriend',
    data(){
        return{
            searchValue:null,
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
    methods:{
        search:function(val){
            this.list = null;
            if(val==''||val==null){
                this.$toast.error('请输入昵称或ID');
            }else{
                const loading = this.$loading();
                searchUser({'keyword':val}).then(res => {
                    loading.close();
                    if(res.code==1){
                        if(res.data.list.length<1){
                            this.$toast.success('没有这个用户');
                        }else{
                            this.list = res.data.list;
                        }
                    }else{
                        this.$toast.error(res.msg);
                    }
                })
            }
        },
        addFriend:function(id){
            const loading = this.$loading();
            addBook({'id':id}).then(res => {
                loading.close();
                if(res.code==1){
                    this.$toast.success(res.msg);
                }else{
                    this.$toast.error(res.msg);
                }
            })
        }
    },
    // html加载完成之前执行,执行顺序：父组件-子组件
    created(){},
    // html加载完成之后执行
    mounted(){},
}
</script>
