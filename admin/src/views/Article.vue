<template>
  <div>
    <el-row>
        <el-col :offset="22">
            <el-button type='primary' @click="$router.push(`/admin/articleAdd/${uid}`)">新增文章</el-button>
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
        prop="title"
        label="标题"
        width="180">
        </el-table-column>
        <el-table-column
        prop="updateT"
        label="发布时间">
        </el-table-column>
        <el-table-column
        prop="author.username"
        label="作者">
        </el-table-column>
        <el-table-column
        prop="option"
        label="操作">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle @click="$router.push(`/admin/articleEdit/${scope.row._id}/${scope.row.title}/${scope.row.author._id}`)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="deleteUser(scope.row._id)"></el-button>
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        uid:'',
        model: []
      }
    },
    async created () {
        const res =await this.$http.get('/article');

        this.model = res.data;

        this.uid = localStorage.uid;

        this.model.forEach((el,index) => {
            this.model[index].updateT = this.model[index].updateT.split('T')[0]
        });
    },
    methods:{
      deleteUser(aid) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res = await this.$http.delete(`/articleEdit?aid=${aid}`)
          if(res.data == 'ok')this.$message.success('删除成功!');

          //删除成功  重新渲染文章列表界面
          const newRes =await this.$http.get('/article')
          this.model = newRes.data
        }).catch(() => {
          this.$message.info('已取消删除');         
        });
      }
    }
  }
</script>