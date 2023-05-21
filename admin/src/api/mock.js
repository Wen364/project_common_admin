import Mock from 'mockjs'
// 把处理的数据封装成方法，方便二次使用
import homeServe from './mockServe/home'
import user from './mockServe/user'
import permission from '@/api/mockServe/permission'
// 定义 mock请求拦截
// 三个参数  url地址  type类型  function函数
// 这里函数，直接调用的 方法

// 获取首页数据
Mock.mock('/api/home/getData','get',homeServe.getStatisticalData)

// 用户列表数据
Mock.mock(/api\/user\/getUser/,'get',user.getUserList)
Mock.mock('/api/user/del','post',user.deleteUser)
Mock.mock('/api/user/add','post',user.createUser)
Mock.mock('/api/user/edit','post',user.updateUser)

Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)