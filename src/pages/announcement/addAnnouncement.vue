<template>
  <div>
    <div class="moudle-title">添加公告</div>
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
        <el-form-item label="活动形式" prop="content" required>
          <!-- <quill-editor 
            v-model="form.content" 
            ref="myQuillEditor" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor> -->
          <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 20}" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedMenus" @change="handleCheckedMenusChange">
            <el-checkbox v-for="(user,index) in users" :label="user.email" :key="index">{{user.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// require styles
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { SendEmail, AddAnnouncement, getStudentInfo } from "../../server/index";
export default {
  components: {
    quillEditor
  },
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
      users: [],      // 权限列表
      checkAll: false,
      checkedMenus: [],
      isIndeterminate: true,
      // 富文本(舍弃)
      editorOption:{}
    };
  },
  created(){
    this.requestStuInfo();
  },
  methods: {
    // 获取用户信息
    requestStuInfo(){
      let This = this;
      getStudentInfo().then(({data})=>{
        This.users = data.data;
      })
    },
    // 全选
    handleCheckAllChange(val){
      console.log(val)
      if(val){
        this.checkedMenus = this.users.map(item=>{
          return item.email
        })
      } else {
        this.checkedMenus = []
      }
      console.log(this.checkedMenus)
      this.isIndeterminate = false;
    },
    // 
    handleCheckedMenusChange(value){
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.users.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.users.length;
    },
    // 提交
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
      var date = new Date();
      var year = date.getFullYear(); //获取年
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1; //获取月
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); //获取当日
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); // 获取当前小时
      var min =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); // 获取当前分钟
      var sec =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); // 获取当前秒
      var time =
        year + "-" + month + "-" + day + " " + hours + ":" + min + ":" + sec; //组合时间
        var type = 1
      switch(this.form.type[0]){
        case '团建': 
          type = 1;
          break;
        case '通知':
          type = 2;
          break;
        case '其他': 
          type = 3;
          break;
      }
      var params = {
        title: this.form.name,
        content: this.form.content,
        time: this.form.date,
        saveTime: time,
        type: type,
        email: this.checkedMenus.join(','),
        poster: JSON.parse(window.localStorage.getItem('userInfo')).userName
      };
      SendEmail(params).then(({data})=>{
        console.log(data)
        if(data.status == 200){
          AddAnnouncement(params).then(({ data }) => {
            console.log(data);
            if (data.status == 200) {
              this.$message.success('添加成功');
              this.$router.push({
                name: "announcementList"
              });
            } else {
              this.$message.error('操作失败');
            }
          });
        }
      })
      // console.log("submit!", this.form, params);
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 富文本(舍弃)
    onEditorReady(editor) { // 准备编辑器
 
        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
  },
  /*
  computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    }*/
};
</script>

<style lang="scss" scoped>
</style>