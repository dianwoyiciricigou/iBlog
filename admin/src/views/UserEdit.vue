<template>
<el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align:center">  
            <span>{{$route.params.username?"修改":"新建"}}用户</span>
        </div>
        <el-form :model="model" label-position="top" :rules="rules" ref="form">
            <el-form-item label="用户名" class="item" prop="username">
                <el-input type="text" v-model="model.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" class="item" prop="email">
                <el-input type='text' v-model="model.email" autocomplete="off" disabled v-if="$route.params.username"></el-input>
                <el-input type='text' v-model="model.email" autocomplete="off" v-else></el-input>
            </el-form-item>
            <el-form-item label="密码" class="item" prop="password">
                <el-input type='password' v-model="model.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色" class="item">
            <el-select v-model="model.role" style="width:100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="状态" class="item">
            <el-select v-model="model.state" style="width:100%">
              <el-option
                v-for="item in stateOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">{{$route.params.username?"修改":"新增"}}</el-button>
        </el-form-item>
    </el-form>
</el-card>
</template>

<script>
export default {
  data () {
    //前台表单验证
    var validatePass = (rule,val,callback) => {

      if(!val) callback(new Error('请输入用户名'));

      let reg = /\w{2,16}/
      if(!reg.test(val)) callback(new Error('用户名格式不正确'));
      callback()
    }


    var validatePass1 = (rule,val,callback) => {

      if(!val) callback(new Error('请输入邮箱'));
      
      let reg = /^[0-9a-zA-Z]+[-|0-9a-zA-Z._]+@\w+.[a-z]{2,}$/
      if(!reg.test(val)) callback(new Error('邮箱格式不正确'));

      callback()
    }


    var validatePass2 = (rule,val,callback) => {

      if(!val) callback(new Error('密码不能为空'));
      
      let reg = /\w{2,16}/
      if(!reg.test(val)) callback(new Error('密码格式不正确'));

      callback()
    }

    return {
      model:{ 
        role: '', 
        state:''
      } ,
      options: [{
          value: '普通用户',
          label: '普通用户'
        }, {
          value: '超级管理员',
          label: '超级管理员'
        }],
        stateOpt:[{
          value: '启用',
          label: '启用'
        },{
          value: '禁用',
          label: '禁用'
        }],
        rules:{
          username: [
            { validator: validatePass, trigger: 'blur' }
          ],
          email: [
            { validator: validatePass1, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
    }
  },
  mounted() {
    //console.log(this.$route.params)
    for(let attr in this.$route.params) {
      
      this.$set(this.model,attr,this.$route.params[attr])

    }
  },
  methods:{
    submitForm(form) {
      this.$refs[form].validate((valid) => {

          if (valid) {

            if (!this.$route.params.username) {
              this.change()
              this.$http.post('/userEdit',this.model).then(res => {
                if(res.data == 'ok') this.$message.success('添加用户成功')
                this.$router.push('/admin/user')
              })
            } else {     
              this.change()
              this.$http.put('/userEdit',this.model).then(res => {
                if(res.data == 'ok') this.$message.success('修改用户成功')
                this.$router.push('/admin/user')
              })
            }
            
          } else {
            this.$message.error('表单中有错误，请检查仔细重新填写')
            return false;
          }

      })
    },
    change () {
      this.model.role = this.model.role == '超级管理员'?'admin':'normal'
      this.model.state = this.model.state == '启用'?1:0
    }
  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    height: 5rem;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 50vw;
    margin:0 auto
  }
</style>