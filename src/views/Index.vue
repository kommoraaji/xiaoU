<template>
  <div class="layout">
    <v-chart style="flex:1" :options="option1"></v-chart>
    <v-chart style="flex:1" :options="option2"></v-chart>
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
// import "echarts/lib/component/polar";

export default {
  components: {
    "v-chart": ECharts
  },
  data() {
    return {
      option1: {},
      option2: {}
    };
  },
  mounted() {
    setTimeout(() => {
      this.option1 = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar"
          }
        ]
      };
      this.option2 = {
        series: [
          {
            type: "pie",
            // radius: "80%",
            // center: ["50%", "50%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
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
    }, 500);
  }
};
</script>

<style lang="stylus" scoped>
.layout
  display flex
  justify-content space-around
  background-color #fff
</style>
