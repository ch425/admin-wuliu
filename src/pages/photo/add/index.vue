<template>
  <div>
    <div class="moudle-title">添加相册</div>
    <div style="width: 70%;margin-top:30px;">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称" prop="name" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" required prop="date">
          <el-date-picker
            v-model="form.date"
            type="datetime"
            placeholder="选择日期时间"
            align="left"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="活动性质" prop="type" required>
          <el-checkbox-group v-model="form.type" :max="1">
            <el-checkbox label="团建" name="type"></el-checkbox>
            <el-checkbox label="通知" name="type"></el-checkbox>
            <el-checkbox label="其他" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="上传图片" prop="photo" required>
          <el-upload
            action="http://139.155.73.51:8082/uploadImg"
            list-type="picture-card"
            :multiple="true"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :on-error="imgUploadError"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
          <!-- <el-button @click="resetForm('form')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {addActivityPhoto} from '../../../server/index'
export default {
  name: "add",
  data() {
    return {
      form: {
        name: "",
        date: "",
        type: [],
        content: ""
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        content: [
          { required: true, message: "请填写活动形式", trigger: "blur" }
        ]
      },
      // 上传图片
      dialogImageUrl: '',
      dialogVisible: false,
        fileList:[]
    };
  },
  methods: {
      handleRemove(file, fileList) {
        // console.log(file, fileList);
        // console.log(this.fileList)
        this.fileList = fileList.map(item=>{
          return item.response.data[0].img
        })
        console.log(this.fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleAvatarSuccess(res, file) {//图片上传成功
        // console.log(res);
        // console.log(file);
        this.fileList.push(res.data[0].img)
        console.log(this.fileList,res.data[0].img);
        console.log(this.fileList)
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      imgUploadError(err, file, fileList){//图片上传失败调用
        // console.log(err)
        this.$message.error('上传图片失败!');
      },
      // 立即添加
      onSubmit: function (){
        var This = this;
        var params = {
          activity_name: this.form.name,      // 活动名称
          activity_time: this.form.date,      // 活动时间
          activity_type: this.form.type.join(','),      // 活动类型
          activity_img: this.fileList.join(','),       // 活动图片
        }
        console.log(params)
        addActivityPhoto(params).then(({data})=>{
          console.log(data);
          if(data.status==200){
            this.$message.success('添加数据成功!');
            this.$router.push('/photo/index')
          } else {
            this.$message.error('添加失败!')
          }
        })
      }
  }
};
</script>

<style lang="scss" scoped>
</style>