<template>
  <div>
    <el-table :data="getStateUser" style="width: 100%;margin-bottom: 20px;">
      <el-table-column prop="uid" label="用户ID"></el-table-column>
      <el-table-column prop="username" label="管理员名称"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="2"
            :disabled="true"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip
            effect="light"
            content="编辑"
            :enterable="false"
            placement="left"
          >
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              circle
              @click="editform(scope.row)"
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
              @click="delform(scope.row.uid)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageInfo.size"
      :total="count"
      @current-change="getPage"
    ></el-pagination>
  </div>
</template>
<script>
import { getUserDel, getUserList, getUserCount } from "@/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      count: 0,
      pageInfo: {
        size: 8,
        page: 1
      }
    };
  },
  computed: {
    ...mapGetters(["getStateUser"])
  },
  methods: {
    ...mapActions(["getActionUser"]),
    editform(val) {
      this.$emit("editform", { ...val });
    },
    delform(uid) {
      this.$confirm("是否删除该条内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        getUserDel({ uid }).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.getCount();
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    getCount() {
      getUserCount().then(res => {
        if (res.code == 200) {
          this.count = res.list[0].total;
          this.$store.dispatch("getActionUser", this.pageInfo);
        }
      });
    },
    getPage(n) {
      this.pageInfo.page = n;
      this.$store.dispatch("getActionUser", this.pageInfo);
    }
  },
  mounted() {
    this.getCount();
  }
};
</script>
<style lang="stylus" scoped>
@import "../../../stylus/index.styl"
.el-tooltip + .el-button
  margin-left 0

>>>.el-switch.is-checked .el-switch__core,.el-button--primary
  border-color $color
  background-color $color

>>>.el-pagination.is-background .el-pager li:not(.disabled).active
  background-color $color
</style>
