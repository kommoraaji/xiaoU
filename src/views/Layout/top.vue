<template>
  <el-header>
    <el-row>
      <el-button class="menuitem" size="small" type="primary" @click="TOGGLE">
        <i :class="iscollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
      </el-button>
    </el-row>

    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row>
      <el-button
        class="back"
        size="small"
        icon="el-icon-back"
        circle
        v-if="$route.path != '/index'"
        @click="$router.back()"
      ></el-button>
    </el-row>

    <div class="icontitle">
      <el-badge :value="10" class="item">
        <el-popover
          placement="bottom-end"
          width="200"
          trigger="click"
          content="暂无消息"
        >
          <ul style="width:100%">
            <li class="news">消息一</li>
            <li class="news">消息二</li>
            <li class="news">消息三</li>
            <li class="news">消息四</li>
            <li class="news">
              查看所有消息<i class="el-icon-right" style="margin-left:5px"></i>
            </li>
          </ul>
          <i
            class="el-icon-message"
            slot="reference"
            style="font-size:24px;color:red"
          ></i>
        </el-popover>
      </el-badge>

      <el-badge :value="10" class="item">
        <el-popover
          placement="bottom-end"
          width="200"
          trigger="click"
          content="暂无消息"
        >
          <ul style="width:100%">
            <li class="news">通知一</li>
            <li class="news">通知二</li>
            <li class="news">通知三</li>
            <li class="news">通知四</li>
            <li class="news">
              查看所有消息<i class="el-icon-right" style="margin-left:5px"></i>
            </li>
          </ul>
          <i
            class="el-icon-message-solid"
            slot="reference"
            style="font-size:24px;color:#1E90FF"
          ></i>
        </el-popover>
      </el-badge>
    </div>

    <el-dropdown>
      <span class="el-dropdown-link"
        >欢迎光临：admin<i class="el-icon-arrow-down el-icon--right"></i
      ></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          ><i class="el-icon-full-screen"></i>全屏操作</el-dropdown-item
        >
        <el-dropdown-item
          ><i class="el-icon-user"></i>个人信息</el-dropdown-item
        >
        <el-dropdown-item
          ><i class="el-icon-switch-button"></i>退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  components: {},
  data() {
    return {
      visible: false
    };
  },
  computed: {
    ...mapState(["iscollapse"])
  },
  methods: {
    ...mapMutations(["TOGGLE"])
  }
};
</script>
<style lang="stylus" scoped>
@import "../../stylus/index.styl";
.el-header
  display flex
  align-items center
  padding-left 0
  height 70px !important

.menuitem
  border none
  padding 8px 15px
  background $color

.menuitem:active
  background $activecolor

.back:hover
  background none
  color $color
  border-color $color

.icontitle
  position absolute
  right 300px
  z-index 10

.item
  margin-top 10px
  margin-right 25px

.news
  width 100%
  height 40px
  line-height 40px
  padding-left 15px
  box-sizing border-box

.news:last-child
  text-align center
  cursor pointer

.news:hover
  background rgba(204,204,204,.1)

.el-main
  background-color #f7f7f7
  color #333

.el-icon-s-fold
.el-icon-s-unfold
  font-size $sixteen

.el-breadcrumb
  margin 0 20px
  font-size $fourteen

.el-dropdown
  position absolute
  right 30px
  cursor pointer
  color #333
  font-size $fourteen
  .el-dropdown__item:hover
    background-color $color

.el-icon-arrow-down
  font-size 12px

.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover
  background $activecolortp
  color $color
</style>
