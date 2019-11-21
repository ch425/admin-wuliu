<template>
  <div>
    <div>
        用户信息页面
        <input
              id="uploader"
              style="display:none"
              type="file"
              @change="selectFile($event)"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
        <el-button type="primary" style="float: right;" @click="addUserInfo">添加</el-button>
    </div>
    <div>
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe style="width: 100%">
        <el-table-column prop="id" label="学号" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="role" label="职位" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
          <div class="pageControl" style="margin-top:15px;">
            <el-pagination
              align="center"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :current-page="currentPage"
              :page-sizes="[10,20,50,100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length"
            ></el-pagination>
          </div>
    </div>
  </div>
</template>

<script>
import {importFile, getStudentInfo} from '../../server/index'
export default {
    data(){
        return {
            tableData: [],
            currentPage: 1, // 当前页码
            pageSize: 10,
            loading: false,
        }
    },
    created(){
      this.requestData();
    },
    methods:{
      // 请求用户信息列表
        requestData(){
          let This = this;
          getStudentInfo().then(({data})=>{
            console.log(data);
            This.tableData = data.data;
          })
        },
        // 添加按钮
        addUserInfo(){
            document.querySelector('#uploader').click();
        },
        // 选择文件
        selectFile(ele){
            // debugger
            var This = this;
            var formData = new FormData();
            This.file = ele.target.files[0];
            formData.append('file',This.file)
            console.log(This.file,formData)
            importFile(formData).then(({data})=>{
                console.log(data)
            })
        },
        handleClick(item){

        },
        // 切换页数
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        // 切换每页多少条数据
        handleSizeChange(val){
          this.pageSize = val;
        }
    }
};
</script>

<style lang="scss" scoped>
</style>