<template>
  <el-aside :width="iscollapse ? '64px' : '220px'">
    <p class="title" :style="iscollapse ? 'font-size:12px' : 'font-size:22px'">
      小U商城后台
    </p>
    <el-row>
      <el-col :span="24">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#4e4e4e"
          text-color="#fff"
          active-text-color="coral"
          router
          unique-opened
          :collapse="iscollapse"
          :collapse-transition="false"
        >
          <el-menu-item index="/index">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/menu">菜单管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
              <el-menu-item index="/user">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/category">商品分类</el-menu-item>
              <el-menu-item index="/specs">商品规格</el-menu-item>
              <el-menu-item index="/goods">商品管理</el-menu-item>
              <el-menu-item index="/member">会员管理</el-menu-item>
              <el-menu-item index="/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/seckill">秒杀管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["iscollapse"])
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="stylus" scoped>
@import "../../stylus/index.styl"
.el-aside
  background-color $bgcolor
  height 100vh
  .title
    width 100%
    height 70px
    line-height 70px
    letter-spacing 2px
    text-align center
    overflow hidden
    font-weight normal
    color $white
    background #5e5e5e

.el-menu
  border none

.is-active
  color $color !important
</style>
