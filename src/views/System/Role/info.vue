<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加角色' : '编辑角色'"
      :visible.sync="info.isshow"
      width="40%"
      :before-close="closeform"
    >
      <el-form
        :model="formInfo"
        :rules="rules"
        ref="formInfo"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="formInfo.rolename"></el-input>
        </el-form-item>

        <el-form-item label="权限">
          <el-tree
            :data="getStateMenu"
            show-checkbox
            node-key="id"
            default-expand-all
            ref="tree"
            :props="defaultProps"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="formInfo.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item>
          <div class="footer">
            <el-button class="cancel" @click="cancel">取 消</el-button>
            <el-button v-if="info.isadd" class="define" @click="subinfo"
              >确 定</el-button
            >
            <el-button v-else class="define" @click="subinfo">更 新</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleAdd, getRoleEdit } from "@/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isadd: true,
          isshow: false
        };
      }
    }
  },
  data() {
    return {
      formInfo: {
        rolename: "",
        menus: "",
        status: 1
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ]
      },
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  computed: {
    ...mapGetters(["getStateMenu", "getStateRole"])
  },
  methods: {
    ...mapActions(["getActionMenu", "getActionRole"]),
    closeform() {
      (this.info.isshow = false), this.reset();
      this.$refs.formInfo.clearValidate();
    },
    subinfo() {
      this.$refs.formInfo.validate(valid => {
        if (valid) {
          if (this.info.isadd) {
            this.formInfo.menus = this.$refs.tree.getCheckedKeys().join(",");
            getRoleAdd(this.formInfo).then(res => {
              if (res.code == 200) {
                this.$message.success(res.msg);
              } else if (res.code == 500) {
                this.$message.warning(res.msg);
              } else {
                this.$message.error(res.msg);
              }
              this.info.isshow = false;
              this.reset();
              this.getActionRole();
            });
          } else {
            getRoleEdit(this.formInfo).then(res => {
              if (res.code == 200) {
                this.$message.success(res.msg);
              } else if (res.code == 500) {
                this.$message.warning(res.msg);
              } else {
                this.$message.error(res.msg);
              }
              this.info.isshow = false;
              this.reset();
              this.getActionRole();
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.info.isshow = false;
      this.$refs.formInfo.clearValidate();
      this.reset();
    },
    reset() {
      this.formInfo = {
        rolename: "",
        menus: "",
        status: 1
      };
    }
  },
  mounted() {
    this.getActionMenu();
    this.getActionRole();
  }
};
</script>
<style lang="stylus" scoped>
@import "../../../stylus/index.styl"

>>>.el-dialog__body
  padding 30px 45px 10px

>>>.el-dialog__title,
>>>.el-radio__input.is-checked +.el-radio__label,.el-select-dropdown__item.selected
  color $color

>>>.el-dialog__header
  border-bottom 1px solid $bordercolor
  padding 15px 20px 15px

.add:active
  background $activecolor

>>>.el-select .el-input.is-focus .el-input__inner,
>>>.el-radio__input:hover .el-radio__inner,
>>>.el-input__inner:focus
>>>.el-checkbox__inner:hover
  border-color $color

.el-select-dropdown__item:hover
  background $activecolor
  color $white

.el-select-dropdown__item.selected:hover
  color $white

>>>.el-radio__input.is-checked .el-radio__inner,
>>>.el-switch.is-checked .el-switch__core,
>>>.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner
  border-color $color
  background $color

.footer
  text-align right
  .define
    background $color
    color $white
    border none
  .define:active
    background $activecolor
  .cancel:hover,
  .cancel:active,
  .cancel:focus
    color $color
    border-color $color
    background-color #fff
</style>
