<template>
  <div >
      <el-row :gutter="10">
        <!-- home首页左侧 -->
        <el-col :span="8">
          <!-- 上面的卡片区域 -->
            <el-card>
              <div slot="header">
                <div class="user">
                    <img src="../../assets/user.png" alt="">
                    <div class="userInfo">
                      <p>Admin</p> 
                      <p style="font-size:16px; color:#999999">超级管理员</p>
                    </div>
                </div>
                
              </div>
              <div class="loginInfo">
                <p>上次登陆时间：<span style="padding-left:20px">2023-5-14</span></p>
                <p>上次登陆地点：<span style="margin-left:50px;padding-right:20px">哈尔滨</span></p>
              </div>
            </el-card>

            <!-- 下面的table区域 -->
            <el-card style="margin-top:20px; height:486px">
                <el-table style="width: 100%; line-height:0"  :data="tableData">
                  <el-table-column prop="name" label="品牌" width="width" align="center"></el-table-column>
                  <el-table-column prop="todayBuy" label="今日购买" width="width" align="center"></el-table-column>
                  <el-table-column prop="monthBuy" label="本月购买" width="width" align="center"></el-table-column>
                  <el-table-column prop="totalBuy" label="总购买" width="width" align="center"></el-table-column>
                </el-table>
            </el-card>
            
        </el-col>
        <!-- home首页右侧 -->
        <el-col :span="16">
          <!-- 上面小卡片 -->
          <div class="count">
            <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex'}" class="card">
                <i :class="`el-icon-${item.icon}`" class="icon" :style="`background-color:${item.color}`"></i>
                <div class="container">
                    <p class="money">￥{{item.value}}</p>
                    <p class="content">{{item.name}}</p>
                </div>
                
            </el-card>
          </div>
          <!--  -->
          <el-card style="height:280px">
            <!-- 折线图 -->
            <div class="chart" ref="line"></div>
          </el-card>
          <div class="graph">
              <el-card style="height:260px">
                <!-- 柱状图 -->
                <div style="height:260px" ref="bar"></div>
              </el-card>
              <el-card style="height:260px">
                <div style="height:260px" ref="pie"></div>
              </el-card>
          </div>
        </el-col>
      </el-row>
  </div>
  
</template>

<script>
import * as echarts from 'echarts'
export default {
    name:'Home',
    data() {
      return {
        // 左侧 table 表格数据
        tableData:[],
        // 右侧 数据
        countData:[
            {
              name: "今日支付订单",
              value: 1234,
              icon: "success",
              color: "#2ec7c9",
            },
            {
              name: "今日收藏订单",
              value: 210,
              icon: "star-on",
              color: "#ffb980",
            },
            {
              name: "今日未支付订单",
              value: 1234,
              icon: "s-goods",
              color: "#5ab1ef",
            },
            {
              name: "本月支付订单",
              value: 1234,
              icon: "success",
              color: "#2ec7c9",
            },
            {
              name: "本月收藏订单",
              value: 210,
              icon: "star-on",
              color: "#ffb980",
            },
            {
              name: "本月未支付订单",
              value: 1234,
              icon: "s-goods",
              color: "#5ab1ef",
            },
        ],
        // 折线图数据
        orderData:{},
        // 
        userData:[],
        // 
        videoData:[]
      }
    },
    methods: {
      // 请求首页数据
       async getFirstData(){
        // console.log(this.$api);
        let result = await this.$api.home.reqFirstPageData() 
        const {data} = result.data
        // console.log(data);
        // 赋值  
        this.orderData = data.orderData

        this.tableData = data.tableData

        this.userData = data.userData

        this.videoData = data.videoData

        // 折线图
        //#region 
        // echarts 初始化
        let myChart = echarts.init(this.$refs.line)
        // console.log(myChart);
        // 定义配置项  (折线图)
        let echartsOption1 = {}
        // 获取 x轴数据
        let xAxis = Object.keys(this.orderData.data[0])
        // 配置 x 轴数据
        echartsOption1.xAxis = {
          data:xAxis
        }
        // 配置 y 轴 
        echartsOption1.yAxis = {}
        // 配置 legend 
        echartsOption1.legend = {
          data:xAxis
        }
        // 配置 series
        echartsOption1.series = []
        xAxis.forEach(key => {
            echartsOption1.series.push({
              name: key,
              type:'line',
              data: this.orderData.data.map(item => item[key])
            })
        })
        // console.log(echartsOption1);
        // 画出 折线图 图表
        myChart.setOption(echartsOption1)
        //#endregion

        // 柱状图
        //#region 
        let myChart1 = echarts.init(this.$refs.bar)
        let barOption = {
              legend: {
                // 图例文字颜色
                textStyle: {
                  color: "#333",
                },
              },
              grid: {
                left: "20%",
              },
              // 提示框
              tooltip: {
                trigger: "axis",
              },
              xAxis: {
                type: "category", // 类目轴
                data: this.userData.map(item => item.date),
                axisLine: {
                  lineStyle: {
                    color: "#17b3a3",
                  },
                },
                axisLabel: {
                  interval: 0,
                  color: "#333",
                },
              },
              yAxis: [
                {
                  type: "value",
                  axisLine: {
                    lineStyle: {
                      color: "#17b3a3",
                    },
                  },
                },
              ],
              color: ["#2ec7c9", "#b6a2de"],
              series: [
                {
                  name:'新增用户',
                  type:'bar',
                  data: this.userData.map(item => item.new)
                },
                {
                  name:'活跃用户',
                  type:'bar',
                  data: this.userData.map(item => item.active)
                }
              ],
        }
        // console.log(barOption.series);
        myChart1.setOption(barOption)
        //#endregion


        // 饼状图
        let myChart2 = echarts.init(this.$refs.pie)
        let pieOption = {
            tooltip: {
              trigger: "item",
            },
            color: [
              "#0f78f4",
              "#dd536b",
              "#9462e5",
              "#a6a6a6",
              "#e1bb22",
              "#39c362",
              "#3ed1cf",
            ],
            series: [
              {
                type:'pie',
                radius: '50%',
                data: this.videoData
              }
            ],
          }

          myChart2.setOption(pieOption)
      },
      
    },
    mounted() {
      // 请求数据
      this.getFirstData()
      
    },
}
</script>

<style lang="less" scoped>

.user{
  display: flex;
  align-items: center;
  .userInfo{
    height: 150px;
    p{
      height: 50px;
      font-size: 32px;
    }
  }
  img{
    height: 150px;
    width: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
}
.loginInfo{
  p{
    font-size: 14px;
    line-height: 35px;
    color: #999999;
    span {
      margin: 0 90px 0 15px;
      color: #666666;
    }
  }
}
/deep/ .el-card__body{
  line-height: 18px !important;
  text-align: left;
}
.count{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .card{
      width: 32%;
      margin: 0 0px 20px 0;
    }
    .icon{
        height: 80px;
        width: 80px;
        font-size: 30px;
        line-height: 80px;
        text-align: center;
        color: #fff;
      }
    .container{
        .money{
          font-size: 30px;
          margin: 20px 0 10px 5px;
        }
        .content{
          font-size: 14px;
          margin: 5px 0 0 15px;
          color: #999;
        }
    }
}

/deep/.el-card__body{
  padding: 0;
}

.chart{
  height: 280px;
  width: 100%;
}
.graph{
  display: flex;
  justify-content: space-between;
  // background-color: pink;
  margin: 20px 0 0 0 ;
  .el-card{
    width: 48%;
  }
}
</style>