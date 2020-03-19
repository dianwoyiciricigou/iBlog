const express = require('express')

const app = express()

const bodyParser = require('body-parser')

app.set('secret','asdsd5dasd5a656')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }))

//生成虚拟文件夹，将想要的文件暴露到参一的路由上面
app.use('/',express.static(__dirname + '/web'))
app.use('/admin',express.static(__dirname + '/admin'))
app.use('/upload',express.static(__dirname + '/upload'))

const admin = require('./routes/admin')
const home = require('./routes/home')
//跨域包引用进来
app.use(require('cors')())

require('./model/connect')

app.use('/admin/api',admin)

app.use('/home/api',home)

//错误处理中间件
app.use(async(err,req,res,next) => {
    res.status(err.statusCode || 500).send({
        msg:err.message
    })
})

app.listen(3000)
console.log("网站服务器已启动！")