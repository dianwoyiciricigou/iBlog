<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="text-align:center">
          <span>卡片名称</span>
      </div>
      <el-form :model="model" label-position="top" ref="form" :rules="rules">
          <el-form-item label="标题" class="item" prop="title">
              <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="作者" class="item">
              <el-input v-model="model.author" disabled></el-input>
          </el-form-item>
          <el-form-item label="发布时间" class="item" prop="updateT">
              <el-date-picker
                v-model="model.updateT"
                type="datetime"
                placeholder="选择日期时间"
                style="width:100%">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="文章封面" class="item cover" prop="cover">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="true"
                :on-success="afterUpload">
                <img v-if="model.cover" :src="model.cover" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
          </el-form-item>
          <el-form-item label="内容" class="editor" prop="content">
              <vue-editor v-model="model.content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">{{this.$route.params._id?'修改':'新增'}}</el-button>
           </el-form-item>
      </el-form>
    </el-card>
</template>

<script>
    import { VueEditor } from "vue2-editor";

    var validatePass = (rule,val,callback) => {

      if(!val) callback(new Error('请输入标题'));

      callback()
    }
    var validatePass1 = (rule,val,callback) => {

      if(!val) callback(new Error('请选择时间'));

      callback()
    }
export default {
    components : {
      VueEditor
    },
    data () {
        return {
          model:{
            title:'',
            cover:'',
            content:''
          },
          rules:{
            title: [
              { validator: validatePass, trigger: 'blur' },
            ],
            updateT: [
              { validator: validatePass1, trigger: 'blur' },
            ]
          }
        }
    },
    async created () {

      if (this.$route.params.uid) {
        return this.model.author = this.$route.params.uid;
      }

      //文章修改界面   获取数据库里面的数据渲染到页面上
      this.model.author = this.$route.params.userID
      this.model.title = this.$route.params.title
      const res = await this.$http.get(`/articleEdit?_id=${this.$route.params._id}`)
      this.model.content = res.data.content
      this.model.cover = res.data.cover
    },
    methods: {
      //上传成功之后，做的事情
      afterUpload(res) {
        //console.log(res.url)
        this.model.cover = res.url;
      },

      //文本编辑器的上传文件
      async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
        var formData = new FormData();
        formData.append("image", file);

        const res =await this.$http.post('/upload',formData)
        Editor.insertEmbed(cursorLocation, "image", res.data.url);

        resetUploader();
      },
      submitForm(form) {
        this.$refs[form].validate((valid) => {
            if (valid) {
              if (!this.$route.params._id) {
                this.$http.post('/articleAdd',this.model).then(res => {
                  if(res.data == 'ok') this.$message.success('添加文章成功')
                  this.$router.push('/admin/article')
                })
              } else {
                //文章修改界面   修改数据库     
                this.$http.put(`/articleEdit?_id=${this.$route.params._id}`,this.model).then(res => {
                  if(res.data == 'ok') this.$message.success('修改文章成功')
                  this.$router.push('/admin/article')
                })
              }
              
            } else {
              this.$message.error('表单中有错误，请检查仔细重新填写')
              return false;
            }

        })
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
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .cover {
    height:auto
  }
</style>
