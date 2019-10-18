<template>
  <div>
    <div class="moudle-title">公告列表</div>
    <div class="content">
      <el-table v-loading="loading" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe style="width: 100%">
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="content" label="活动内容" align="center"></el-table-column>
        <el-table-column prop="activeTime" label="活动时间" align="center"></el-table-column>
        <el-table-column prop="pushTime" label="发布时间" align="center"></el-table-column>
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
    <el-dialog title="公告详情" :visible.sync="dialogVisible" append-to-body>
      <el-form ref="form" :model="form">
        <el-form-item label="活动名称: " prop="name" required>
          <span>{{form.name}}</span>
        </el-form-item>
        <el-form-item label="活动时间: " required prop="date">
          <span>{{form.date}}</span>
        </el-form-item>
        <el-form-item label="活动性质: " prop="type" required>
          <span>{{form.type}}</span>
        </el-form-item>
        <el-form-item label="活动内容: " prop="content" required>
          <span>{{form.content}}</span>
          <!-- <p v-html="form.content"></p> -->
        </el-form-item>
        <el-form-item>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { GetAnnouncement } from "../../server/index";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      form: {
        name: "",
        date: "",
        type: [],
        content: ""
      },
      currentPage: 1, // 当前页码
      pageSize: 10,
      loading: false,
    };
  },
  created() {
    let This = this;
    var params = {
      id: ""
    };
    GetAnnouncement(params).then(({ data }) => {
      console.log(data);
      This.tableData = data.data.map(item => {
        return {
          pushTime: item.saveTime, // 上传时间
          activeTime: item.time, // 活动时间
          content: item.content, // 活动内容
          title: item.title, // 活动标题
          type: item.type     // 公告类型
        };
      });
    });
  },
  methods:{
      handleClick(item){
          console.log(item)
          this.dialogVisible = true
          this.form = {
            name: item.title,
            content: item.content,
            date: item.activeTime,
            type: item.type
          }
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