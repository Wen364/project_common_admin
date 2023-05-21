

const routes = [
    {
        path:'/',
        component: () => import('@/views/Main'),
        name:'main',
        redirect:'/home',   // 重定向到 home页面
        children:[
            //#region 
            // {
            //     name:'user',
            //     path:'user',
            //     // 路由懒加载
            //     component: () => import('@/views/User')
            // },
            // {
            //     name:'home',
            //     path:'home',
            //     component: () =>import('@/views/Home')
            // },
            // {
            //     name:'mall',
            //     path:'mall',
            //     component:() =>import('@/views/Mall')
            // },
            // {
            //     name:'page1',
            //     path:'page1',
            //     component:() =>import('@/views/PageOne')
            // },
            // {
            //     name:'page2',
            //     path:'page2',
            //     component:() =>import('@/views/PageTwo')
            // }
            //#endregion
        ]
    },
    {
        path:'/login',
        name:'login',
        component: () => import('@/views/Login')
    }
    
]

export default routes