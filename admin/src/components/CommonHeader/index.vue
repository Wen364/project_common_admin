<template>
  <div class="header-container">
    <div class="left-container">
        <el-button icon="el-icon-menu" size="mini" @click="handlerCollapse()"></el-button>
        <!-- 面包屑区域 -->
        <!-- <span>首页</span> -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: tab.path }" v-for="tab in tabList" :key="tab.name">{{tab.label}}</el-breadcrumb-item>
            
        </el-breadcrumb>
    </div>
    <div class="right-container">
        <!-- 下拉菜单 -->
        <el-dropdown>
            <span class="el-dropdown-link">
                <img src="../../assets/user.png" alt="">
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
    name:"CommonHeader",
    methods: {
        handlerCollapse(){
            // 向仓库 派发 mutations
            this.$store.commit('tab/UPDATE_Collapse')
        },
        // 退出登录
        loginOut(){
            // 移除 token
            Cookie.remove('token')

            // 清除 Cookie 里的 menu
            Cookie.remove('menu')
            
            this.$message({type:'success',message:'退出成功'})

            this.$router.push('/login')
            

        }
    },
    computed: {
        ...mapState('tab',['tabList'])
    },
}
</script>

<style scoped lang="less">
.header-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: #333;
}
.left-container{
    display: flex;
    margin-left: 20px;
    text-align: left;
    /deep/.el-breadcrumb{
        margin: 8px 0 0 10px ;
        .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
            color: #666 ;
            font-weight: normal;
        }
        .el-breadcrumb__item{
            &:last-child{
                .el-breadcrumb__inner{
                    color: #fff;
                }
            }
        }
        
    }
}
.left-container span {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
}
.right-container img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    vertical-align: middle;
    /* padding: 0 15px 3px 0; */
    margin: 0 15px 5px 0; 
}
</style>
<style >
    .el-header{
    padding: 0 0 0 0 !important;
}
</style>