<template>
  <div>
    <el-button size="small" class="add" @click="addlist">
      <i class="el-icon-circle-plus-outline"></i>
      <span>添加</span>
    </el-button>
    <v-info :info="info" ref="dialog"></v-info>
    <v-list @editform="editform"></v-list>
  </div>
</template>

<script>
import vList from "./list";
import vInfo from "./info";
export default {
  data() {
    return {
      info: {
        isadd: false,
        isshow: false
      }
    };
  },
  methods: {
    addlist() {
      this.info.isadd = this.info.isshow = true;
    },
    editform(val) {
      this.info.isadd = false;
      this.info.isshow = true;
      this.$refs.dialog.formInfo = val;
    }
  },
  components: {
    vList,
    vInfo
  }
};
</script>

<style lang="stylus" scoped>
@import "../../../stylus/index.styl"
.add
  margin-bottom 20px
  border none
  padding 10px 15px
  color $white
  background $color
  font-size $fourteen
  span
    margin 0
</style>
