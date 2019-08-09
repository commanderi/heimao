import Vue from 'vue'
import Axios from 'axios'
import Qs from 'qs'
import router from '../router/index.js'

// Axios.defaults.baseURL = 'http://api.7ib78kg.cn/'
Axios.defaults.baseURL = '/api/'
Axios.defaults.timeout = 50000
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Axios.defaults.headers.post['Accept'] = 'application/json'
// Axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
Axios.defaults.headers.get['Accept'] = 'application/json'
// Axios.defaults.withCredentials = true;// 跨域携带cookie

Axios.defaults.transformRequest = [function (data) {
  return Qs.stringify(data)
}]
// 设置请求token
Axios.interceptors.request.use(config => {
    // let token = store.state.token
    let token = localStorage.getItem('token');
    config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8', //设置请求格式为form-data
        'token': token
    }
    return config
})
// 接口错误拦截
Axios.interceptors.response.use(res => {
    if (res.data.code === -1) {
        alert('登录身份过期，请重新登录');
        sessionStorage.removeItem('token')
        router.push({name:'index'});
    } else {
        return res.data
    }
}, err => {
    alert('服务器响应错误:' + err.message);
    return Promise.reject(err)
})
export default Axios
