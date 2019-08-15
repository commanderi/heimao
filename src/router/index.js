import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
const page = name => () => import('@/components/' + name)
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/all', //跳转后需要显示的组件
            name: 'all',
            component: page('all') //跳转的组件的路径
        },
        // {
        //     path: '/chat', //跳转后需要显示的组件
        //     name: 'chat',
        //     component: page('pages/chat') //跳转的组件的路径
        // },
        // {
        //     path: '/friend',
        //     name: 'friend',
        //     component: page('pages/friend')
        // },
        // {
        //     path: '/my',
        //     name: 'my',
        //     component: page('pages/my')
        // },
        {
            path: '/addFriend',
            name: 'addFriend',
            component: page('pages/addFriend')
        },
        {
            path: '/friendInfo',
            name: 'friendInfo',
            component: page('pages/friendInfo')
        },
        {
            path: '/reception',
            name: 'reception',
            component: page('pages/reception')
        },
        {
            path: '/createQun',
            name: 'createQun',
            component: page('pages/createQun')
        },
        {
            path: '/boast',
            name: 'boast',
            component: page('pages/boast')
        },
    ]
})
