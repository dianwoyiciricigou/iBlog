<template>
<div>
  <el-row>
    <el-col :offset="22">
      <el-button type='primary' @click="click">新增用户</el-button>
    </el-col>
  </el-row>
  <el-table
  :data="tableData"
  stripe
  border
  style="width: 100%">
  <el-table-column
    prop="id"
    label="ID"
    width="180">
  </el-table-column>
  <el-table-column
    prop="username"
    label="用户名"
    width="180">
  </el-table-column>
  <el-table-column
    prop="email"
    label="邮箱">
  </el-table-column>
  <el-table-column
    prop="role"
    label="角色">
  </el-table-column>
  <el-table-column
    prop="state"
    label="状态">
  </el-table-column>
  <el-table-column
    label="操作">
    <el-button type="primary" icon="el-icon-edit" circle></el-button>
    <el-button type="danger" icon="el-icon-delete" circle></el-button>
  </el-table-column>
  </el-table>
</div>
</template>

<style>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>


<script>
  export default {
    data() {
      return {
        model:{},
        tableData: [{
          id: '2016-05-02',
          username: '王小虎',
          email: '1258849260@qq.com',
          role:'admin',
          state:'启用'
        },{
          id: '2016-05-02',
          username: '王小虎',
          email: '1258849260@qq.com',
          role:'admin',
          state:'启用'
        }]
      }
    },
    methods:{
     async click () {
        const res = await this.$http.get('user?id=hx')
        console.log(res)
        this.$router.replace('/admin/user')
      }
    }
  }
</script>