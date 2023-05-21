<template>
    <el-card class="card">
        <div>系统登录</div>
        <el-form ref="form" :model="loginForm" label-width="80px" :rules="rules" style="margin:30px 40px 30px 0">
            <el-form-item label="用户名:" prop="username">
                <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-button type="primary" style="margin-left:35px" @click="submit">登录</el-button>
        </el-form>
    </el-card>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
export default {
    name:'Login',
    data() {
        return {
            // 表单
            loginForm:{
                username:'',
                password:''
            },
            rules:{
                username:[
                    {required: true, message:'请输入用户名', trigger: 'blur'}
                ],
                password:[
                    {required: true, message:'请输入密码', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        // 表单提交 （登录）
        submit(){
            // const token = Mock.Random.guid()
            // Cookie.set('token',token)
            // 先校验数据，在发请求
            this.$refs.form.validate(async(valid) => {
                if(valid) {
                    let {data} = await this.$api.user.getMenu(this.loginForm)
                    console.log(data);
                    if(data.code == 20000){
                        // Cookie 里存放 token
                        Cookie.set('token',data.data.token)
                        
                        // 把数据 menu 存放到仓库里
                        this.$store.commit('tab/SET_MENU',data.data.menu)
                        this.$store.commit('tab/ADDMenu',this.$router)
                        // 跳转到登录页
                        this.$router.push('/home')
                    }else{
                        this.$message.error(data.data.message)
                    }
                }
            })
            
        }
    },
}
</script>

<style scoped>
.card {
    display: flex;
    justify-content: center;
    align-content: center;
    text-align: center;
    margin: 100px auto;
    height: 300px;
    width: 500px;
}
</style>