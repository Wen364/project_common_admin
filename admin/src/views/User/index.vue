<template>
  <div>
      <div class="user">
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="50%"
          :before-close="handleClose">
          
          <!-- 用户表单信息 -->
          <el-form ref="form" :model="form" label-width="80px" :inline='true' :rules="rules">
            <!-- 姓名 -->
            <el-form-item label="姓名" prop="name">
              <el-input placeholder="请输入姓名" v-model="form.name" ></el-input>
            </el-form-item>
            <!-- 年龄 -->
            <el-form-item label="年龄" prop="age">
              <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
            </el-form-item>
            <!-- 性别 -->
            <el-form-item label="性别" prop="sex">
              <el-select v-model="form.sex" placeholder="请选择">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
            <!-- 出生日期 -->
            <el-form-item label="出生日期" prop="birth">
              <el-date-picker
                v-model="form.birth"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-DD"
                >
              </el-date-picker>
            </el-form-item>
            <!-- 地址 -->
            <el-form-item label="地址" prop="addr">
              <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
            </el-form-item>
            
          </el-form>
          <!-- 确认 和 取消 按钮 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
          </span>
        </el-dialog>

        <div class="user-header">
          <el-button type="primary" icon="el-icon-plus" @click="handlerAdd">新增</el-button>

          <el-form ref="form" :model="userForm" label-width="80px" inline>
            <el-form-item >
              <el-input v-model="userForm.name" placeholder="请输入" style="width:180px;margin-right:10px"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button type="primary" @click="handlerInputSearch">搜索</el-button>
            </el-form-item>
          </el-form>
          
        </div>
        
        <el-table style="width: 100%;margin-top:10px;" height="90%" :data="tableList" border stripe> 
          <el-table-column prop="" type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" width="150" align="center"></el-table-column>
          <el-table-column prop="age" label="年龄" width="100" align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" width="100" align="center"></el-table-column>      
          <el-table-column prop="birth" label="出生日期" width="width" align="center"></el-table-column>
          <el-table-column prop="addr" label="地址" width="width" align="center"></el-table-column>
          <el-table-column prop="" label="操作" width="width" align="center">
              <template slot-scope="{row,$index}">
                <!-- 编辑按钮 -->
                <el-button type="primary" size="mini" @click="handlerEdit(row)">编辑</el-button>
                <!-- 删除按钮 -->
                <el-button type="danger" size="mini" @click="handlerDelete(row)">删除</el-button>
              </template>
          </el-table-column>
        </el-table>

        <div class="user-footer">
          <!-- 分页器 -->
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            :current-page="pageData.page"
            @current-change="handlerPage"
            >
          </el-pagination>
        </div>

      </div>
  </div>
  
</template>

<script>
export default {
    name:'User',
    data() {
      return {
        dialogVisible: false,
        // user-header 头部 搜索框的 数据
        userForm:{
          input:''
        },
        // 分页器总页数
        total: 0,
        // 
        pageData:{
          page: 1,
          limit:20 
        },

        form:{
          name:'',
          age:'',
          sex:'',
          addr:'',
          birth:''
        },
        rules:{
          name:[
            {required:true, message:'请输入姓名'},
          ],
          age:[
            {required:true, message:'请输入年龄'}
          ],
          sex:[
            {required:true, message:'请选择姓别'}
          ],
          addr:[
            {required:true, message:'请填写地址'}
          ],
          birth:[
            {required:true, message:'请选择出生日期'}
          ],
        },
        // 表格数据
        tableList:[],
        // 用来区分 是 新增 还是 编辑
        modelType: 0     // 0 是 新增    1 是 编辑
      }
    },
      methods: {
        // 获取数据
        async getUserList(pageData){
          // 发请求
          let {data} = await this.$api.user.getUserList({params:{...this.userForm,...pageData}})
          console.log(data);
          // 给 total 赋值
          this.total =  data.count  || 0
          // 赋值
          // 因为 sex 性别 为 1 和 0  所以需要处理一下数据
          data.list.forEach(item => {
            if(item.sex == 1){
              item.sex = '男'
            }else{
              item.sex = '女'
            }
          })
          // 赋值
          this.tableList = data.list 
        } ,

        // dialog 关闭按钮
        handleClose() {
          // 清空表单
          this.$refs.form.resetFields()
          // 关闭 dialog
          this.dialogVisible = false
        },

        // 新增按钮回调
        handlerAdd(){
          this.dialogVisible = true
          this.modelType = 0
        },
        
        // 提交表单 
        submitForm(){
          
          // 开始校验规则
          this.$refs.form.validate(async (validate) => {
            // validate 返回的是 布尔值 当校验成功则 为 true  失败为 false
            if(validate) {

                // 判断
                if(this.modelType == 0) {
                  // 发请求
                  let {data} = await this.$api.user.addUserList(this.form)
                  // console.log(result);
                  if(data.code == 20000){
                    // 刷新页面
                    this.getUserList()

                    this.$message({type:'success',message:'添加成功'})
                    
                  }else{
                    this.$message.error('添加失败')
                  }
                }else{
                  // 发请求
                  let {data} = await this.$api.user.updateUserList(this.form)
                  // console.log(data);
                  // 判断
                  if(data.code == 20000){
                    // 刷新页面
                    this.getUserList()

                    this.$message({type:'success',message:'修改成功'})

                  }else{
                    this.$message.error('修改失败')
                  }
                }
              
                // 清空表单
                this.$refs.form.resetFields()
                // 关闭弹窗 dialog
                this.dialogVisible = false
                // 对表单数据的后续操作
                
            }else{
              this.$message({type:'warning',message:'请输入内容'})
            }
          })
        },

        // 取消按钮
        cancel(){
          // 调用 handleClose方法
          this.handleClose()
        },

        // 编辑按钮 回调
        handlerEdit(row){
          console.log(row);
          this.modelType = 1
          // 显示 dialog
          this.dialogVisible = true
          // 注意 当前数据 需要进行深拷贝 否则会出错
          this.form = JSON.parse(JSON.stringify(row)) 

        },

        // 删除按钮回调
        handlerDelete(row){
          // console.log(row);
          // messageBox 消息框
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            // 发请求
            let {data} = await this.$api.user.deleteUserList(row)
            // 判断
            if(data.code == 20000) {
            this.$message({type:'success',message:'删除成功'})
            // 刷新页面数据
            this.getUserList()
          }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        },

        // 头部搜索框
        handlerInputSearch(){
          this.getUserList(this.userForm)
        },

        // 分页器的回调 
        handlerPage(page){
          // console.log(page);
          // 赋值
          this.pageData.page = page
          // 发请求
          this.getUserList(this.pageData)
        }
      },
      mounted() {
        // 获取数据
        this.getUserList()
      },
    
}
</script>

<style scoped lang="less">
.user{
  height: 78vh;
  .user-header{
    display: flex;
    justify-content: space-between;
    height: 40px;
  }
  .user-footer{
    text-align: center;
  }
}
</style>