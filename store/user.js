//做登录权限验证
import Cookie from 'js-cookie'
export default {
    state: {
        token: ''
    },
    mutations: {
        setToken(state, val){
            state.token = val 
            //两个参数 cookie的名称 和 值
            Cookie.set('token', val)
        },
        clearToken(state){
            state.token = ''
            Cookie.remove('token')
        },
        getToken(state){
            state.token = Cookie.get('token') || state.token
        }
    }
}