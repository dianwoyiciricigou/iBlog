const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/iBlog',{useNewUrlParser:true}).then(()=>console.log('数据库连接成功'))