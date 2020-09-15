<template>
  <div>
    <el-table
      :data="getStateRole"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="rolename" label="标题"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="2"
            :disabled="true"
          ></el-switch>
          <!-- <el-tag v-if="scope.row.status == 1" type="success">已启用</el-tag>
          <el-tag v-if="scope.row.status == 2" type="danger">已禁用</el-tag> -->
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
              @click="delform(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getRoleEdit, getRoleDel } from "@/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getStateRole"])
  },
  methods: {
    ...mapActions(["getActionRole"]),
    editform(val) {
      this.$emit("editform", { ...val });
      // let idarr = val.menus.split(",");
      // console.log(idarr);
      // if (idarr[0]) {
      //   console.log(this.$refs.tree);
      // }
    },
    delform(id) {
      this.$confirm("是否删除该条内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        getRoleDel(id).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.getActionRole();
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    }
  },
  mounted() {
    this.getActionRole();
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
</style>
