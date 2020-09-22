<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加菜单' : '编辑菜单'"
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
        <el-form-item label="类型">
          <el-radio-group v-model="formInfo.type">
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="所属" v-if="formInfo.type == 2">
          <el-select v-model="formInfo.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in filterhome"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标题" prop="title" :key="formInfo.pid">
          <el-input v-model="formInfo.title"></el-input>
        </el-form-item>

        <el-form-item
          label="图标"
          v-if="formInfo.type == 1 || formInfo.pid == 0"
        >
          <el-input v-model="formInfo.icon"></el-input>
        </el-form-item>

        <el-form-item label="地址" v-if="formInfo.type == 2">
          <el-input v-model="formInfo.url"></el-input>
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
import { getMenuAdd, getMenuEdit } from "@/axios";
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
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      },
      rules: {
        title: [
          { required: true, message: "请输入标题名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["getStateMenu"]),
    filterhome() {
      return this.getStateMenu.filter(item => {
        return item.type != 2;
      });
    }
  },
  methods: {
    ...mapActions(["getActionMenu"]),
    closeform() {
      (this.info.isshow = false), this.reset();
      this.$refs.formInfo.clearValidate();
    },
    subinfo() {
      this.$refs.formInfo.validate(valid => {
        if (valid) {
          if (this.info.isadd) {
            getMenuAdd(this.formInfo).then(res => {
              if (res.code == 200) {
                this.$message.success(res.msg);
              } else if (res.code == 500) {
                this.$message.warning(res.msg);
              } else {
                this.$message.error(res.msg);
              }
              this.info.isshow = false;
              this.reset();
              this.getActionMenu();
            });
          } else {
            getMenuEdit(this.formInfo).then(res => {
              if (res.code == 200) {
                this.$message.success(res.msg);
              } else if (res.code == 500) {
                this.$message.warning(res.msg);
              } else {
                this.$message.error(res.msg);
              }
              this.info.isshow = false;
              this.reset();
              this.getActionMenu();
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
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      };
    }
  },
  mounted() {
    this.getActionMenu();
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
