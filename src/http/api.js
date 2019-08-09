import axios from './axios.js'

// 登录
export const login = params => { return axios.post('login/dologin', params).then(res => res).catch(err => err) }
// 聊天室列表
export const chatroom = params => { return axios.post('chatroom/lists', params).then(res => res).catch(err => err) }
// 融云token
export const getRcToken = params => { return axios.post('friend/getRcToken', params).then(res => res).catch(err => err) }


















