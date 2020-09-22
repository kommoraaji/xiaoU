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
        <el-form-item label="上级分类">
          <el-select v-model="formInfo.pid" placeholder="请选择">
            <el-option label="顶级目录" :value="0"></el-option>
            <el-option
              v-for="item in getStateCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" prop="catename">
          <el-input v-model="formInfo.catename"></el-input>
        </el-form-item>

        <el-form-item label="分类图片">
          <el-upload
            action=""
            :auto-upload="false"
            list-type="picture-card"
            :limit="1"
            :on-preview="handPreview"
            :on-change="change"
            :file-list="filelist"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
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
import { getCateAdd, getCateEdit } from "@/axios";
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
      dialogVisible: false,
      dialogImageUrl: "",
      formInfo: {
        pid: "",
        catename: "",
        img: "",
        status: 1
      },
      filelist: [],
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["getStateCate"])
  },
  methods: {
    ...mapActions(["getActionCate"]),
    //关闭窗口
    closeform() {
      (this.info.isshow = false), this.reset();
      this.$refs.formInfo.clearValidate();
    },
    //预览
    handPreview(file) {
      console.log(file);
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    change(file, fileList) {
      // console.log(file);
      this.formInfo.img = file.raw;
    },
    subinfo() {
      this.$refs.formInfo.validate(valid => {
        if (valid) {
          let formdata = new FormData();
          for (let k in this.formInfo) {
            formdata.append(k, this.formInfo[k]);
          }
          if (this.info.isadd) {
            getCateAdd(formdata).then(res => {
              if (res.code == 200) {
                this.$message.success(res.msg);
              } else if (res.code == 500) {
                this.$message.warning(res.msg);
              } else {
                this.$message.error(res.msg);
              }
              this.info.isshow = false;
              this.reset();
              this.getActionCate();
            });
          } else {
            getCateEdit(formdata).then(res => {
              if (res.code == 200) {
                this.$message.success(res.msg);
              } else if (res.code == 500) {
                this.$message.warning(res.msg);
              } else {
                this.$message.error(res.msg);
              }
              this.info.isshow = false;
              this.reset();
              this.getActionCate();
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
        pid: "",
        catename: "",
        img: "",
        status: 1
      };
      this.filelist = [];
    }
  },
  mounted() {
    this.getActionCate();
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

>>>.el-upload--picture-card:hover, .el-upload:focus
  border-color $bordercolor
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
