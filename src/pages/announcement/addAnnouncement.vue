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
      :picker-options="pickerOptions">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="活动性质" prop="type" required>
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="团建" name="type"></el-checkbox>
      <el-checkbox label="通知" name="type"></el-checkbox>
      <el-checkbox label="其他" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="活动形式" prop="content" required>
    <el-input type="textarea" v-model="form.content"></el-input>
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
export default {
    data() {
      return {
        form: {
          name: '',
          date: '',
          type: [],
          content: ''
        },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
        this.form.saveTime = new Date();
        
        console.log('submit!',this.form);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>