import request from "@/utils/request";

//获取用户列表
export const getUserList = (params) => {
    // 返回用户列表
    return request.get('/user/getUser',params)
}

// 新增
export const addUserList = (params) => {
    // 返回用户列表
    return request({method:'post',url:'/user/add',data:params})
}

// 删除
export const deleteUserList = (params) => {
    // 返回用户列表
    return request({method:'post',url:'/user/del',data:params})
}

// 修改
export const updateUserList = (params) => {
    // 返回用户列表
    return request({method:'post',url:'/user/edit',data:params})
}

// 登录后返回的数据
export const getMenu = (data) => {
    return request.post('/permission/getMenu',data)
}