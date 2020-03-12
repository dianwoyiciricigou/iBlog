const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true)

mongoose.connect('mongodb://hanxiang:hanxiang@localhost:27017/blog',{useNewUrlParser:true, useUnifiedTopology: true }).then(async ()=>console.log('数据库连接成功'))