<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="购物产品比例" name="1">
        <div class="item">
          <el-progress
            type="circle"
            color="#D15B47"
            :width="progressWidth"
            :stroke-width="size"
            :percentage="num[0]"
          ></el-progress>
          <p>食品类</p>
        </div>
        <div class="item">
          <el-progress
            type="circle"
            color="#87CEEB"
            :width="progressWidth"
            :stroke-width="size"
            :percentage="num[1]"
          ></el-progress>
          <p>服装类</p>
        </div>
        <div class="item">
          <el-progress
            type="circle"
            color="#87B87F"
            :width="progressWidth"
            :stroke-width="size"
            :percentage="num[2]"
          ></el-progress>
          <p>数码配件</p>
        </div>
        <div class="item">
          <el-progress
            type="circle"
            color="#D63116"
            :width="progressWidth"
            :stroke-width="size"
            :percentage="num[3]"
          ></el-progress>
          <p>手机</p>
        </div>
        <div class="item">
          <el-progress
            type="circle"
            color="#FF6600"
            :width="progressWidth"
            :stroke-width="size"
            :percentage="num[4]"
          ></el-progress>
          <p>电脑</p>
        </div>
        <div class="item">
          <el-progress
            type="circle"
            color="#2AB023"
            :width="progressWidth"
            :stroke-width="size"
            :percentage="num[5]"
          ></el-progress>
          <p>电子产品</p>
        </div>
        <div class="item">
          <el-progress
            type="circle"
            color="#1E3AE6"
            :width="progressWidth"
            :stroke-width="size"
            :percentage="num[6]"
          ></el-progress>
          <p>厨房用品</p>
        </div>
        <div class="item">
          <el-progress
            type="circle"
            color="#C316A9"
            :width="progressWidth"
            :stroke-width="size"
            :percentage="num[7]"
          ></el-progress>
          <p>家用电器</p>
        </div>
        <div class="item">
          <el-progress
            type="circle"
            color="#13A9E1"
            :width="progressWidth"
            :stroke-width="size"
            :percentage="num[8]"
          ></el-progress>
          <p>卫浴</p>
        </div>
      </el-collapse-item>
    </el-collapse>

    <el-row class="tac">
      <el-col style="width:230px">
        <h3>订单类型分类</h3>
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-menu-item index="1">
            <i class="el-icon-s-operation"></i>
            <span slot="title">全部订单</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-document-remove"></i>
            <span slot="title">食品类</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document-remove"></i>
            <span slot="title">服装类</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-document-remove"></i>
            <span slot="title">数码配件</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-document-remove"></i>
            <span slot="title">手机</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-document-remove"></i>
            <span slot="title">电脑</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-document-remove"></i>
            <span slot="title">电子产品</span>
          </el-menu-item>
          <el-menu-item index="8">
            <i class="el-icon-document-remove"></i>
            <span slot="title">厨房用品</span>
          </el-menu-item>
          <el-menu-item index="9">
            <i class="el-icon-document-remove"></i>
            <span slot="title">家用电器</span>
          </el-menu-item>
          <el-menu-item index="10">
            <i class="el-icon-document-remove"></i>
            <span slot="title">卫浴</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col class="colright">
        <div class="title">
          <span>订单编号</span>
          <el-input
            style="width:300px;margin:0 10px"
            v-model="input"
            placeholder="请输入订单编号"
            clearable
          ></el-input>
          <div class="block">
            <span class="demonstration">日期</span>
            <el-date-picker v-model="value1" type="date" placeholder="选择日期">
            </el-date-picker>
            <el-button class="btn" type="primary">查询</el-button>
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          class="tablefrom"
          style="width:100%;height:440px;overflow:auto"
          :stripe="true"
          :border="true"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column prop="number" label="订单编号" width="160">
          </el-table-column>
          <el-table-column prop="name" label="产品名称" width="230">
          </el-table-column>
          <el-table-column label="总价(￥)">
            <template slot-scope="scope">{{
              scope.row.price | price
            }}</template>
          </el-table-column>
          <el-table-column prop="discount" label="优惠"></el-table-column>
          <el-table-column label="订单时间">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="type" label="所属类型"></el-table-column>
          <el-table-column prop="num" label="数量"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == 1" type="success"
                >已发货</el-tag
              >
              <el-tag v-if="scope.row.status == 2" type="warning"
                >待发货</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-tooltip
                effect="light"
                content="发货"
                :enterable="false"
                placement="left"
              >
                <el-button
                  type="success"
                  size="small"
                  icon="el-icon-truck"
                  circle
                  :disabled="scope.row.status == 1 ? true : false"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                effect="light"
                content="详情"
                :enterable="false"
                placement="left"
              >
                <el-button
                  type="warning"
                  size="small"
                  icon="el-icon-tickets"
                  circle
                ></el-button>
              </el-tooltip>
              <el-tooltip
                effect="light"
                content="删除"
                :enterable="false"
                placement="right"
              >
                <el-button
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  circle
                  @click="del(scope.$index)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      activeNames: ["1"],
      num: [],
      progressWidth: 100,
      size: 8,
      input: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      value1: "",
      value2: "",
      tableData: [
        {
          number: 20200705445622,
          name: "男士衬衫",
          price: 75,
          discount: 9,
          date: "2020-05-03",
          type: "服装",
          num: 1,
          status: 1
        },
        {
          number: 20200705445628,
          name: "iPhone 11",
          price: 4599,
          discount: 199,
          date: "2020-05-03",
          type: "手机",
          num: 1,
          status: 1
        },
        {
          number: 20200705445633,
          name: "三只松鼠大礼包",
          price: 62.8,
          discount: 9.9,
          date: "2020-05-04",
          type: "食品",
          num: 1,
          status: 2
        },
        {
          number: 20200705445644,
          name: "ROG幻14",
          price: 10999,
          discount: 50,
          date: "2020-05-05",
          type: "电脑",
          num: 1,
          status: 2
        },
        {
          number: 20200705445665,
          name: "拯救者R7000P",
          price: 7899,
          discount: 300,
          date: "2020-05-05",
          type: "电脑",
          num: 1,
          status: 1
        },
        {
          number: 20200705445689,
          name: "拯救者Y7000P",
          price: 8999,
          discount: 500,
          date: "2020-05-05",
          type: "电脑",
          num: 1,
          status: 1
        },
        {
          number: 20200705445703,
          name: "Apple AirPods Pro降噪耳机",
          price: 1668,
          discount: 0,
          date: "2020-05-06",
          type: "数码配件",
          num: 1,
          status: 2
        },
        {
          number: 20200705445756,
          name: "忆捷数据线苹果快充 黑色",
          price: 9.9,
          discount: 0,
          date: "2020-05-05",
          type: "数码配件",
          num: 1,
          status: 1
        },
        {
          number: 20200705445815,
          name: "小米智能扫地机器人",
          price: 399,
          discount: 20,
          date: "2020-05-05",
          type: "家用电器",
          num: 1,
          status: 1
        }
      ]
    };
  },
  methods: {
    del(index) {
      this.$confirm("确认删除该条订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    setTimeout(() => {
      this.num = [20, 55, 90, 30, 60, 40, 46, 65, 56];
    }, 200);
  }
};
</script>

<style lang="stylus" scoped>
@import "../../../stylus/index.styl"
>>>.el-collapse-item__header
  font-size 16px
  background-color #fff
  padding-left 25px
  border-bottom 1px solid #efefef

.item
  float left
  padding 15px
  font-size 14px
  text-align center

.el-menu-item
  height 55px
  line-height 55px

.el-menu-item:focus,.el-menu-item.is-active.is-active
  color $white
  background-color $activecolor

.el-menu-item:hover
  color $color
  background-color $activecolortp

.colright
  width -webkit-calc(100% - 230px)
  background #fff
  margin-top 62px
  padding 20px

.block
  display inline-block
  margin 15px 0

// .tablefrom
//   width 100%
//   height 440px
//   overflow auto

.demonstration
  margin-right 10px

>>>.el-input__inner:hover
  border-color $bordercolor

>>>.el-input__inner:focus
  border-color $color

.btn
  margin-left 10px
  background-color $color
  border $color
</style>
