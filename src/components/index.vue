<template>
    <div class="index">
        <div class="index_x" style="height: 100vh;">
            <div class="login">
                <mu-container>
                    <mu-form ref="form" :model="validateForm" class="mu-demo-form">
                        <mu-form-item label="手机号" help-text="" prop="mobile" :rules="usernameRules">
                            <mu-text-field v-model="validateForm.mobile" prop="mobile"></mu-text-field>
                        </mu-form-item>
                        <mu-form-item label="密码" prop="password" :rules="passwordRules">
                            <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
                        </mu-form-item>
                        <mu-form-item>
                            <mu-button color="primary" @click="submit">登录</mu-button>
                            <mu-button @click="clear">重置</mu-button>
                        </mu-form-item>
                    </mu-form>
                </mu-container>
            </div>
        </div>
    </div>
</template>
<script>
// https://docs.rongcloud.cn/im/imlib/web/conversation/structure/
import { login,getRcToken } from '@/http/api'
export default {
    name: 'index',
    data () {
        return {
            usernameRules: [
                { validate: (val) => !!val, message: '必须填写手机号'},
                { validate: (val) => val.length >= 11, message: '手机号长度大于11'}
            ],
            passwordRules: [
                { validate: (val) => !!val, message: '必须填写密码'},
                { validate: (val) => val.length >= 6 && val.length <= 10, message: '密码长度大于6小于10'}
            ],
            validateForm: {
                mobile: '', //发:18280231690  //收:17716105309
                password: '123456',
            },
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
        submit:function(){
            this.$refs.form.validate().then((result) => {
                if(!result){
                    this.$toast.error('登录错误')
                }else{
                    const loading = this.$loading();
                    login(this.validateForm).then(res => {
                        if(res.code==1){
                            localStorage.setItem('token',res.token);
                            getRcToken().then(res => {
                                loading.close();
                                this.$toast.success('登录成功');
                                if(res.code==1){
                                    localStorage.setItem('RcToken',res.data.rcToken);
                                    setTimeout(() => {
                                        this.changePage('/chat', {})
                                    }, 600);
                                }else{
                                    this.$toast.warning('未获取到融云token');
                                }
                            })
                        }else{
                            loading.close();
                            this.$toast.error(res.msg)
                        }
                    })
                }
            });
        },
        clear:function(){
            this.$refs.form.clear();
            this.validateForm = {
                mobile: '',
                password: '',
            };
        },
    },
    // html加载完成之前执行,执行顺序：父组件-子组件
    created(){},
    // html加载完成之后执行
    mounted(){},
    
}
</script>
<style>
.mu-demo-form {
  width: 100%;
  max-width: 550px;
}
.mu-form-item-label,.mu-text-field-input{
    color: #fff;
}
</style>