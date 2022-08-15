import Vue from "vue";
import VueRouter from "vue-router";


//将Vuerouter全局引入
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        //name: 'Main',
        component: () => import('../views/Main.vue'),
        
        children: [
            {
                path: '/',
                redirect: '/home'
            },
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/Home')
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../views/User')
            },
            {
                path: '/mall',
                name: 'mall',
                component: () => import('../views/Mall')
            },
            {
                path: '/page1',
                name: 'page1',
                component: () => import('../views/Other/pageOne')
            },
            {
                path: '/page2',
                name: 'page2',
                component: () => import('../views/Other/pageTwo')
            },
        ]
    },
    {path: '/', redirect: () => import('../views/Home') }
]

//解决重复点击一个路由控制台报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
    routes,
})
 export default router