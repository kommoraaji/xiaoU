<template>
  <div>
    <h2 class="welcome">欢迎访问XXX后台管理系统</h2>
    <div class="title">
      <div class="titIlem">
        <h3>Profit</h3>
        <el-progress type="circle" :percentage="num[0]"></el-progress>
      </div>
      <div class="titIlem">
        <h3>Sales</h3>
        <el-progress
          color="#FFB53E"
          type="circle"
          :percentage="num[1]"
        ></el-progress>
      </div>
      <div class="titIlem">
        <h3>Customers</h3>
        <el-progress
          color="#1EBF93"
          type="circle"
          :percentage="num[2]"
        ></el-progress>
      </div>
      <div class="titIlem">
        <h3>No. of Visits</h3>
        <el-progress
          color="red"
          type="circle"
          :percentage="num[3]"
        ></el-progress>
      </div>
    </div>

    <div class="tag">
      <el-tag effect="dark" type="warning">
        <p class="tit">本周访问数</p>
        <h2 style="font-size:30px">{{ this.itemLabel[0] | math }}</h2>
        <p>
          较上周相比增长了{{
            ((this.itemLabel[0] - lastweek[0]) / lastweek[0]) | percentage
          }}%
        </p>
        <span class="icon el-icon-view"></span>
      </el-tag>
      <el-tag effect="dark" type="info">
        <p class="tit">本周销售量</p>
        <h2 style="font-size:30px">{{ this.itemLabel[1] | math }}</h2>
        <p>
          较上周相比增长了{{
            ((this.itemLabel[1] - lastweek[1]) / lastweek[1]) | percentage
          }}%
        </p>
        <span class="icon el-icon-shopping-cart-full"></span>
      </el-tag>
      <el-tag effect="dark">
        <p class="tit">本周用户总数</p>
        <h2 style="font-size:30px">{{ this.itemLabel[2] | math }}</h2>
        <p>
          较上周相比增长了{{
            ((this.itemLabel[2] - lastweek[2]) / lastweek[2]) | percentage
          }}%
        </p>
        <span class="icon el-icon-user"></span>
      </el-tag>
      <el-tag effect="dark" type="danger">
        <p class="tit">本周收益</p>
        <h2 style="font-size:30px">{{ this.itemLabel[3] | math }}</h2>
        <p>
          较上周相比增长了{{
            ((this.itemLabel[3] - lastweek[3]) / lastweek[3]) | percentage
          }}%
        </p>
        <span class="icon el-icon-money"></span>
      </el-tag>
    </div>

    <div class="main">
      <div class="layout">
        <v-chart :options="option1"></v-chart>
        <v-chart :options="option2"></v-chart>
      </div>
      <el-calendar v-model="value"></el-calendar>
    </div>

    <el-card class="box-card">
      <div v-for="o in 5" :key="o" class="text item">
        {{ "列表内容 " + o }}
      </div>
    </el-card>

    <div class="timer">
      <div class="timetit">
        <p>{{ this.data }}</p>
        <p>{{ this.day }}</p>
      </div>
      <p class="times">{{ this.timer }}</p>
    </div>
    <div class="weather"></div>
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/map/js/china.js";
export default {
  components: {
    "v-chart": ECharts
  },
  data() {
    return {
      lastweek: [61257, 698, 409, 95962],
      itemLabel: [73538, 822, 458, 113358],
      option: {},
      option1: {},
      option2: {},
      value: new Date(),
      num: [],
      data: "",
      timer: "",
      day: ""
    };
  },
  mounted() {
    setInterval(() => {
      function digits(s) {
        return s < 10 ? "0" + s : s;
      }
      var time = new Date();
      var year = time.getFullYear();
      var month = time.getMonth();
      var data = time.getDate();
      var day = time.getDay();
      var weeks = new Array(
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      );
      var week = weeks[day];
      var hour = time.getHours();
      var minutes = time.getMinutes();
      var seconds = time.getSeconds();
      this.data = `${year}年${month}月${data}日`;
      this.day = `${week}`;
      this.timer = `${digits(hour)}:${digits(minutes)}:${digits(seconds)}`;
    }, 1000);
    setTimeout(() => {
      this.num = [84, 55, 83, 39];
    }, 100);
    this.option1 = {
      title: {
        text: "bar"
      },
      dataset: {
        source: [
          ["product", "2015", "2016", "2017"],
          ["Matcha Latte", 43.3, 85.8, 93.7],
          ["Milk Tea", 83.1, 73.4, 55.1],
          ["Cheese Cocoa", 86.4, 65.2, 82.5],
          ["Walnut Brownie", 72.4, 53.9, 39.1]
        ]
      },
      grid: {
        left: "3%",
        right: 0,
        bottom: "10%",
        containLabel: true
      },
      xAxis: { type: "category" },
      yAxis: {},
      series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
    };
    this.option2 = {
      title: {
        text: "pie"
      },
      series: [
        {
          type: "pie",
          radius: "60%",
          center: ["50%", "50%"],
          data: [
            { value: 335, name: "数码科技" },
            { value: 310, name: "电脑办公" },
            { value: 234, name: "食品" },
            { value: 135, name: "家居" },
            { value: 1548, name: "服装" }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
@import "../stylus/index.styl"
.welcome
  height 50px

.title
  display flex
  justify-content space-between
  .titIlem
    text-align center
    width 24%
    padding-bottom 30px
    background-color #fff
    h3
      height 40px
      line-height 40px
      color #333

.tag
  width 100%
  margin 25px 0
  display flex
  justify-content space-between
  align-items center
  text-align center
  letter-spacing 2px
  opacity .9
  .el-tag
    position relative
    width 24%
    height 160px
    border-radius 8px
    font-weight lighter
    overflow hidden
    animation .5s
    .tit
      font-size 18px
      height 50px
      line-height 50px
    h2
      margin 0
      padding 0
      height 60px
      line-height 60px
      font-weight 600
    .icon
      font-size 120px
      opacity .3
      position absolute
      top 30%
      right -3%
      transition .5s
.el-tag:hover .icon
  transform scale(2.3)
  opacity .1


.main
  display flex
  justify-content space-between
  .layout
    width 65%
    height 450px
    display flex
    justify-content space-between
    align-items center
    background-color #fff
    overflow hidden
  .el-calendar
    width 33.5%
    >>>.el-calendar-table .el-calendar-day
      height 70px

.text
  font-size 14px

.item
  padding 18px 0

.box-card
  width 65%
  margin-top -95px

.timer
  float right
  margin-top -195px
  width 32.3%
  min-width 330px
  height 183px
  margin-right 10px
  border-radius 5px
  box-shadow  0 0 7px 15px #fff
  .timetit
    display flex
    justify-content space-between
    width 100%
    height 50px
    line-height 50px
    padding 0 10px
    margin-bottom 10px
    box-sizing border-box
    :nth-of-type(n)
      color $activecolor
      font-size 22px
      font-weight 600
  .times
    font-size 70px
    font-weight 600
    color $color
    text-align center


.weather
  width 100%
  height 300px
  background-color #fff
  margin-top 25px
</style>
