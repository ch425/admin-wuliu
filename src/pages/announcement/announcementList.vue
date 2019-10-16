<template>
  <div>
    <div class="moudle-title">公告列表</div>
    <div class="content">
      <el-table :data="tableData" stripe style="width: 100%">
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
    </div>
  </div>
</template>

<script>
import { GetAnnouncement } from "../../server/index";
export default {
  data() {
    return {
      tableData: []
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
          title: item.title // 活动标题
        };
      });
    });
  },
  methods:{
      handleClick(index){
          console.log(index)
      }
  }
};
</script>

<style lang="scss" scoped>
</style>