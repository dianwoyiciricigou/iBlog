const express = require('express')

const app = express()

const bodyParser = require('body-parser')

app.set('secret','asdsd5dasd5a656')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }))

const admin = require('./routes/admin')
//跨域包引用进来
app.use(require('cors')())

require('./model/connect')

app.use('/admin/api',admin)


//错误处理中间件
app.use(async(err,req,res,next) => {
    res.status(err.statusCode || 500).send({
        msg:err.message
    })
})

app.listen(3000)
console.log("网站服务器已启动！")