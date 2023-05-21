<template>
  <el-menu
    style="overflow:hidden"
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :default-active="$route.name"
  >
    <h3 v-if="!isCollapse">后台管理系统</h3>
  <!-- 没有 children的菜单 -->
    <el-menu-item v-for="item in noChildrenMenu " :key="item.name" :index="item.name" @click="menuRoute(item)">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <!-- 有children的菜单 -->
    <el-submenu v-for="item in ownChildrenMenu" :key="item.label" :index="item.label" >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      
      <el-menu-item-group>
        <span slot="title"></span>
        <el-menu-item  v-for="item in item.children" :key="item.name" :index="item.name" @click="menuRoute(item)" >{{ item.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import Cookie from 'js-cookie'
import { mapState } from 'vuex';
export default {
  name: "CommonAside",
  data() {
    return {
      // isCollapse: false,
      
      
      // Home页面
      
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 点击菜单
    menuRoute(item){
      // console.log(item);
        // console.log(this.$route);
        // 避免一直点击相同页面 这里要注意重定向问题，因为一直点击首页，它则还是会报错，所以把这种情况直接排除掉
        if(this.$route.path != item.path && !(this.$route.path == '/home' && (item.path == '/'))) {
            this.$router.push(item.path)
        }else{
            return    
        }

        // 点击菜单, 把当前点击的数据传给仓库，来进行 面包屑的增加
        this.$store.commit('tab/UPDATE_TABLIST',item)
        
    },
  },
  computed: {
    // 没有子菜单的 左侧内容
    noChildrenMenu() {
        return this.menuData.filter(item => {
            return !item.children
        }) 
    },
    
    // 有子菜单的左侧内容
    ownChildrenMenu() {
        return this.menuData.filter(item => {
            return item.children
        }) 
    },

    // 菜单数据
    menuData(){
      // 判断当前数据 如果缓存里没有 则去 store 里获取数据
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
    },

    isCollapse(){
      return this.$store.state.tab.isCollapse
    }    

  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
    height: 100%;
}
.el-dropdown-menu__item, .el-menu-item{
    padding: 0 50px 0 0;
}
>>>.el-submenu__title{
    /* padding: 0 50px 0 0  !important; */
}
>>>.el-icon-arrow-down:before{
    padding: 0 50px 0 0;
}
h3{
    height: 60px;
    line-height: 60px;
    color:#fff;
    white-space: nowrap;
}
</style>