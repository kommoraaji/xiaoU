<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加管理员' : '编辑管理员'"
      :visible.sync="info.isshow"
      width="40%"
      :before-close="closeform"
    >
      <el-form
        :model="formInfo"
        :rules="rules"
        ref="formInfo"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="roleid">
          <el-select v-model="formInfo.roleid" placeholder="请选择">
            <el-option
              v-for="item in getStateRole"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="管理员名称" prop="username">
          <el-input v-model="formInfo.username"></el-input>
        </el-form-item>

        <el-form-item label="管理员密码">
          <el-input
            v-model="formInfo.password"
            show-password
            clearable
          ></el-input>
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
import { getUserAdd, getUserEdit, getUserCount } from "@/axios";
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
        roleid: "",
        username: "",
        password: "",
        status: 1
      },
      rules: {
        username: [
          { required: true, message: "请输入管理员名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        roleid: [{ required: true, message: "请选择所属角色", trigger: "blur" }]
      },
      pageInfo: {
        size: 8,
        page: 1
      }
    };
  },
  computed: {
    ...mapGetters(["getStateUser", "getStateRole"])
  },
  methods: {
    ...mapActions(["getActionRole", "getActionUser"]),
    closeform() {
      (this.info.isshow = false), this.reset();
      this.$refs.formInfo.clearValidate();
    },
    subinfo() {
      if (this.isadd && !this.formInfo.password) {
        this.$message.warning("请输入密码");
        return;
      }
      this.$refs.formInfo.validate(valid => {
        if (valid) {
          if (this.info.isadd) {
            getUserAdd(this.formInfo).then(res => {
              if (res.code == 200) {
                this.$message.success(res.msg);
              } else if (res.code == 500) {
                this.$message.warning(res.msg);
              } else {
                this.$message.error(res.msg);
              }
              this.info.isshow = false;
              this.reset();
              this.getCount();
            });
          } else {
            getUserEdit(this.formInfo).then(res => {
              if (res.code == 200) {
                this.$message.success(res.msg);
              } else if (res.code == 500) {
                this.$message.warning(res.msg);
              } else {
                this.$message.error(res.msg);
              }
              this.info.isshow = false;
              this.reset();
              this.getCount();
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
        roleid: "",
        username: "",
        password: "",
        status: 1
      };
    },
    getCount() {
      getUserCount().then(res => {
        if (res.code == 200) {
          this.$store.dispatch("getActionUser", this.pageInfo);
        }
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

>>>.el-dialog__body
  padding 30px

>>>.el-dialog__title,
>>>.el-radio__input.is-checked +.el-radio__label,.el-select-dropdown__item.selected
  color $color

.add:active
  background $activecolor

>>>.el-select .el-input.is-focus .el-input__inner,
>>>.el-radio__input:hover .el-radio__inner,
>>>.el-input__inner:focus
  border-color $color

.el-select-dropdown__item:hover
  background $activecolor
  color $white

.el-select-dropdown__item.selected:hover
  color $white

>>>.el-radio__input.is-checked .el-radio__inner,
>>>.el-switch.is-checked .el-switch__core
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
