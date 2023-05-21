<template>
  <div class="tab">
    <el-tag
        size="medium"
        v-for="(item,index) in tabList"
        :key="item.path"
        :type="item.type"
        :effect="$route.name === item.name ? 'dark' : 'plain' "
        :closable="item.name !== 'home'"
        @close="handleClose(item,index)"
        @click="changeMenu(item)"
        >
        {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'CommonTag',
    data() {
        return {
            
        }
    },
    methods: {
        // 删除 tag
        handleClose(item,index){
            // console.log(item);
            // 把数据给仓库 ，让仓库处理
            // 进行逻辑处理，因为删除会有几种情况，如果删除最后面的，则要回退到上一个的位置，
            this.$store.commit('tab/DELETE_TABLIST',item)
            // 删除
            if(item.name !== this.$route.name){
                return
            }
            console.log(this.$route);
            // 判断删除的是否为最后一个
            if(index == this.tabList.length){ 
                //  this.$router.push 里面也可以接收 对象形式 这样就可以实现 删除最后一个，然后跳转回到它的上一个的效果   
                this.$router.push({
                    name: this.tabList[index - 1].name
                })
                // this.$store.commit('tab/DELETE_TABLIST',item)
            }else{
                this.$router.push({
                    name: this.tabList[index].name
                })
            }
            
        },
        // 点击tag
        changeMenu(item){
            if(this.$route.name == item.name){
                return
            }
            this.$router.push(item.path)
        }
    },
    computed: {
        ...mapState('tab',['tabList'])
    },
}
</script>

<style lang="less" scoped>
    .tab {
        padding: 10px;
        .el-tag--dark , .el-tag--plain{
            margin: 3px ;
            cursor: pointer;
        }
    }
</style>