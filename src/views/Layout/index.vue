<template>
  <el-container>
    <v-left></v-left>
    <el-container>
      <el-header class="header">
        <v-top></v-top>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import vLeft from "@/views/Layout/left";
import vTop from "@/views/Layout/top";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {
    vLeft,
    vTop
  }
};
</script>
<style lang="stylus" scoped>
@import '../../stylus/index.styl'
.header
  height 70px !important
  box-shadow 5px 0 15px #ccc
  z-index 1

.el-main
  background-color #f7f7f7
  color #333
</style>
