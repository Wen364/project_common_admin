<template>
  
    <el-container>
      <el-aside width="auto">
        <!-- 左侧菜单栏区域 -->
          <CommonAside></CommonAside>
      </el-aside>
      <el-container>
        <el-header>
          <!-- Header区域 -->
          <CommonHeader></CommonHeader>
        </el-header>
          <!-- tags -->
          <CommonTag></CommonTag>
        <el-main >
          <!-- 展示路由区域 --> 
          <div>
            <router-view></router-view>
          </div>
            
        </el-main>
      </el-container>
    </el-container>
    
  
  
</template>

<script >
import CommonHeader from '@/components/CommonHeader'
import CommonAside from '@/components/CommonAside'
import CommonTag from '@/components/CommonTag'
export default {
    name:'Main',
    components:{CommonAside,CommonHeader,CommonTag}
    
}
</script>

<style scoped>
.el-menu{
  border-right: 0;
}
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    /* background-color: #E9EEF3; */
    color: #333;
    /* text-align: center; */
    /* line-height: 160px; */
    /* height: 100vh; */
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>