<template>
<div>
  <el-row>
    <el-col :offset="22">
      <el-button type='primary' @click="$router.push(`/admin/userAdd`)">新增用户</el-button>
    </el-col>
  </el-row>
  <el-table
  :data="model"
  stripe
  border
  style="width: 100%">
    <el-table-column
      prop="_id"
      label="ID"
      width="250">
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
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" circle @click="$router.push(`/admin/userEdit/${scope.row.username}/${scope.row.email}/${scope.row.role}/${scope.row.state}`)"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="deleteUser(scope.row.email)"></el-button>
      </template>
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
        model:[]
      }
    },
    methods:{
      change() {
        this.model.forEach(el=>{
          el.role = el.role == 'admin'?'超级管理员':'普通用户'
          el.state = el.state == 1?'启用':'禁用'
        })
      },
      deleteUser (email) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(async () => {
          //在此处传回后台删除用户相关信息
          //delete请求和get请求一样，没有data数据传输
          this.$http.delete(`/userEdit?email=${email}`)

          const res =await this.$http.get('/user')
          this.model = res.data
          //this.$router.redirect('/admin/user')
          this.$message.success("删除成功！")
        }).catch(() => {
          this.$message.info('已取消删除')
        });
      }
    },
    async created() {

      const res =await this.$http.get('/user')
      
      this.model = res.data
      this.change()
    }
  }
</script>