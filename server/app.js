const express = require('express')

const app = express()

const admin = require('./routes/admin')
//跨域包引用进来
app.use(require('cors')())

require('./model/connect')

app.use('/admin/api',admin)



app.use(require('body-parser'))

app.listen(3000)
console.log("网站服务器已启动！")