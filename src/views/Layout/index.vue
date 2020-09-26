<template>
  <el-container>
    <v-left style="position:fixed;z-index:10"></v-left>
    <el-container
      :style="iscollapse ? 'margin-left:64px' : 'margin-left:220px'"
    >
      <el-header
        :style="
          iscollapse
            ? 'width:-webkit-calc(100% - 64px)'
            : 'width:-webkit-calc(100% - 220px);'
        "
        class="header"
      >
        <v-top></v-top>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

    <el-button @click="drawer = true" class="topbtn" round>侧边栏</el-button>
    <el-drawer :visible.sync="drawer" :with-header="false">
      <img src="../../assets/img/azurlane.png" />
    </el-drawer>
  </el-container>
</template>
<script>
import vLeft from "@/views/Layout/left";
import vTop from "@/views/Layout/top";
import { mapState } from "vuex";
export default {
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    ...mapState(["iscollapse"])
  },
  components: {
    vLeft,
    vTop
  }
};
</script>
<style lang="stylus" scoped>
@import '../../stylus/index.styl'
>>>.el-drawer
  width 30% !important
  overflow auto
  img
    width 100%

.header
  width -webkit-calc(100% - 220px)
  position fixed
  background-color #fff
  height 70px !important
  box-shadow 5px 0 15px #ccc
  z-index 1

.el-main
  margin-top 70px
  height -webkit-calc(100vh - 70px)
  background-color #f7f7f7
  color #333

.topbtn
  position fixed
  top 15px
  right 200px
  z-index 9

.topbtn:focus,.topbtn:hover,.topbtn:active
  color #333
  background-color #fff
  border-color #ccc
</style>
