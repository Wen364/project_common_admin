import Cookie from "js-cookie"

export default {
    // 开启命名空间
    namespaced:true,

    state:{
        // 用来控制 菜单栏的 隐藏和显示
        isCollapse: false,
        // 面包屑数据
        tabList:[
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            },
        ],
        // 菜单
        menu:[]
    },

    actions:{},

    mutations:{
        UPDATE_Collapse(state){
            // 进行 对仓库中的state的isCollapse进行 修改
            // 这里直接取反就好，不需要给 它 传参数来修改
            state.isCollapse =  !state.isCollapse
        },
        // 修改面包屑
        UPDATE_TABLIST(state,data){
            // console.log(data);
            // 判断添加的数据是否为 home 首页
            if(data.name !== 'home'){
                // 还要判断它不存在 tablist 里面，防止后面面包屑堆积在一起，出现重复
                const index = state.tabList.findIndex(item => item.name === data.name)
                // 如果 要添加的数据 tablist 里面存在 ，就 index为 1 否则为 -1
                if(index == -1){
                    // 如果不存在，则添加到 tablist里面去
                    state.tabList.push(data)
                }
            }
        },
        // 删除面包屑
        DELETE_TABLIST(state,data){
            state.tabList = state.tabList.filter(item => item.name !== data.name)
        },
        // 菜单数据
        SET_MENU(state,data){
            state.menu = data
            // 设置缓存
            Cookie.set('menu',JSON.stringify(data))
        },
        // 动态注册路由
        ADDMenu(state,router){
            // 判断缓存中是否有数据
            if(!Cookie.get('menu')) return 
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            // 组装动态路由的顺序
            const trendRoute = []
            menu.forEach(item => {
                // 如果有子菜单
                if(item.children){
                    item.children = item.children.map(child => {
                        child.component = () => import(`../views/${child.url}`)
                        return child
                    })
                    // 把 子菜单的内容加入 动态路由里
                    trendRoute.push(...item.children)
                }else{
                    item.component = () => import(`../views/${item.url}`)
                    trendRoute.push(item)
                }
            });
            console.log(trendRoute,'@@@');
            // 路由的动态添加
            trendRoute.forEach(item => {
                router.addRoute('main',item)
            })
        }
    },

    getters:{}
}