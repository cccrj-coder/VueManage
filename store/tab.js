import Cookie from "js-cookie"
export default {
    state: {
        isCollapse: false,
        tabsList: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null,
        menu: []
    },
    mutations: {
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val){
            if(val.name !== 'home'){
                state.currentMenu = val
                const result = state.tabsList.findIndex(item => item.name === val.name)
                if(result === -1){
                    state.tabsList.push(val)
                }else{
                    state.currentMenu = null
                }
            }
        },
        closeTag(state, val){
            const result = state.tabsList.findIndex(item => item.name === val.name )
            state.tabsList.splice(result, 1)
        },
        setMenu(state, val){
            state.menu = val
            //将序列化后的menu set到cookie中
            Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state){
            state.menu = []
            Cookie.remove('menu')
        },
        //动态添加路由
        addMenu(state, router){
            if(!Cookie.get('menu')){
                return
            }
            //如果cookie中有menu，则将cookie中的menu转成对象
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu

            const menuArray = []
            menu.forEach(element => {
                if(element.children){
                    element.children = element.children.map(element => {
                        //component: () => import('../views/Other/pageTwo.vue')
                        element.component = () => import('../src/views/' + element.url)
                        return element
                    })
                    menuArray.push(...element.children)
                }else{
                    element.component = () => import('../src/views/' + element.url)
                    menuArray.push(element)
                } 
            });
            //路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }   
    }
}