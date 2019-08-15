import axios from './axios.js'

// 登录
export const login = params => { return axios.post('login/dologin', params).then(res => res).catch(err => err) }
// 聊天室列表
export const chatroom = params => { return axios.post('chatroom/lists', params).then(res => res).catch(err => err) }
// 融云token
export const getRcToken = params => { return axios.post('friend/getRcToken', params).then(res => res).catch(err => err) }
// 個人中心
export const ucenter = params => { return axios.post('user/ucenter', params).then(res => res).catch(err => err) }
// 好友列表
export const friendList = params => { return axios.post('friend/friendLists', params).then(res => res).catch(err => err) }
// 添加好友的用户列表
export const applyUserList = params => { return axios.post('friend/applyUserList', params).then(res => res).catch(err => err) }
// 接受好友添加
export const isAgree = params => { return axios.post('friend/isAgree', params).then(res => res).catch(err => err) }
// 搜索用户
export const searchUser = params => { return axios.post('friend/searchUser', params).then(res => res).catch(err => err) }
// 添加到好友
export const addBook = params => { return axios.post('friend/addBook', params).then(res => res).catch(err => err) }
// 删除好友
export const delFriend = params => { return axios.post('friend/delFriend', params).then(res => res).catch(err => err) }
// 邀请加群好友列表
export const friendLists = params => { return axios.post('chatroom/friendLists', params).then(res => res).catch(err => err) }
// 创建房间
export const createChat = params => { return axios.post('chatroom/createChat', params).then(res => res).catch(err => err) }
// 查看用户信息
export const userInfo = params => { return axios.post('friend/userInfo', params).then(res => res).catch(err => err) }










