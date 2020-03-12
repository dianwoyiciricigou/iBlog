<template>
    <div class="container">
      <el-row class="form">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm">
          <el-form-item label="邮箱" prop="user">
            <el-input type="text" 
              v-model="ruleForm.email" 
              autocomplete="off" 
              prefix-icon="el-icon-s-home">
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" 
              v-model="ruleForm.password" 
              autocomplete="off" 
              show-password 
              prefix-icon="el-icon-key">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
</template>

<style>
  .container {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
  .form {
    padding:50px;
    border-top:2px solid lightblue;
    box-shadow:2px 2px 5px lightslategray;
  }
</style>


<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else {
          let reg = /^[0-9a-zA-Z]+[-|0-9a-zA-Z._]+@\w+.[a-z]{2,}$/
          let res = reg.test(value)
          if (!res) {
            callback(new Error('邮箱格式不正确'));
          }
        }
        callback();
      };
      var validatePass2 = (rule, value, callback) => {
        let reg = /\w{6,12}/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!reg.test(value)){
          callback(new Error('输入的密码格式不正确'));
        } 
        callback()
      };
      return {
        ruleForm: {},
        rules: {
          email: [
            { validator: validatePass, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
     submitForm(formName) {
        var params = new URLSearchParams();
            params.append("email",this.ruleForm.email)
            params.append("password",this.ruleForm.password)

        this.$refs[formName].validate(async (valid) => {
          if (valid) { 
            
            let res = await this.$http.post('/login',params);

            localStorage.token = res.data.token
            this.$router.push('/')
            this.$message.success("登录成功")
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>