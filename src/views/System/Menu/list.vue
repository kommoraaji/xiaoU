<template>
  <div>
    <el-table
      :data="getStateMenu"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.type == 1">目录</el-tag>
          <el-tag type="warning" v-if="scope.row.type == 2">菜单</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="地址"></el-table-column>

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
import { getMenuEdit, getMenuDel } from "@/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getStateMenu"])
  },
  methods: {
    ...mapActions(["getActionMenu"]),
    editform(val) {
      this.$emit("editform", { ...val });
    },
    delform(id) {
      this.$confirm("是否删除该条内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        getMenuDel(id).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.getActionMenu();
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    }
  },
  mounted() {
    this.getActionMenu();
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
