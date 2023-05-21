import Cookie from 'js-cookie'
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入 routes
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    routes  // routes: routes 的缩写
})

// 权限管理  利用 导航守卫
router.beforeEach((to,from,next) => {

    const token = Cookie.get('token')
    // console.log(to);
    // 如果没有 token 则跳转到 登录页 login
    if(!token && to.name !== 'login'){
        next({name:'login'})
    }else if(token && to.name === 'login' ) {
        // 如果当前存在 token  但是还在 登录页 ，则 返回到源路径
        next({path:from.name})
    }else{
        next()
    }
  })

  const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
return originalPush.call(this, location).catch(err => err)
}

export default router