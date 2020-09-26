<template>
  <div style="background:#fff">
    <div class="layout">
      <div class="tag">
        <div style="background:#FF6C60" class="left">
          <span class="icon el-icon-coin"></span>
        </div>
        <div class="right">
          <p class="text">交易金额</p>
          <p class="num">86691.32</p>
        </div>
      </div>
      <div class="tag">
        <div style="background:#57C8F2" class="left">
          <span class="icon el-icon-shopping-cart-1"></span>
        </div>
        <div class="right">
          <p class="text">订单数量</p>
          <p class="num">5656</p>
        </div>
      </div>
      <div class="tag">
        <div style="background:#6CCAC9" class="left">
          <span class="icon el-icon-shopping-cart-1"></span>
        </div>
        <div class="right">
          <p class="text">交易成功</p>
          <p class="num">34565</p>
        </div>
      </div>
      <div class="tag">
        <div style="background:#F8D347" class="left">
          <span class="icon el-icon-shopping-cart-1"></span>
        </div>
        <div class="right">
          <p class="text">交易失败</p>
          <p class="num">34</p>
        </div>
      </div>
      <div class="tag">
        <div style="background:#438EB9" class="left">
          <span class="icon el-icon-coin"></span>
        </div>
        <div class="right">
          <p class="text">退款金额</p>
          <p class="num">3441.68</p>
        </div>
      </div>
    </div>
    <v-chart class="chart" :options="option"></v-chart>
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/map/js/china.js";
export default {
  components: {
    "v-chart": ECharts
  },
  data() {
    return {
      option: {}
    };
  },
  mounted() {
    this.option = {
      title: {
        text: "月购买订单交易记录"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["所有订单", "待付款"]
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "所有订单",
          type: "bar",
          data: [23, 45, 60, 30, 82, 109, 199, 136, 95, 67, 15, 8],
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" }
            ]
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }]
          }
        },
        {
          name: "待付款",
          type: "bar",
          data: [12, 32, 14, 26, 28, 70, 175, 96, 48, 18, 6, 2],
          markPoint: {
            data: [
              { name: "年最高", value: 175, xAxis: 6, yAxis: 175 },
              { name: "年最低", value: 2, xAxis: 11, yAxis: 2 }
            ]
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }]
          }
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
.layout
  width 100%
  padding 30px
  .tag
    width 210px
    height 90px
    border-radius 5px
    border 1px solid #ccc
    margin-right 20px
    float left
    margin-bottom 20px
    .left
      float left
      width 90px
      height 90px
      display flex
      justify-content center
      align-items center
      .icon
        font-size 70px
        color #fff
    .right
      text-align center
      font-size 18px
      .text
        height 50px
        line-height 50px
      .num
        color red

.layout:after{
  content: "020";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
  }

.chart
  width 98%
  height 550px
  margin 0 auto
  padding 30px
  box-sizing border-box
  border 1px solid #999
</style>
