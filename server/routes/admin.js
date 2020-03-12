const express = require('express');
const jwt = require('jsonwebtoken')
const { User } = require('../model/user')

//错误处理模块
const assert = require('http-assert');

const admin = express.Router()

//登录鉴权中间件
const auth = require('../middleWare/middleAuth')
admin.get('/',auth(),(req,res)=>{res.send('ok')})

admin.get('/user',(req,res)=>{
    const query = req.query;
    res.send(query)
})

admin.post('/login',async (req,res)=>{
    const {email,password} = req.body
    // 1 判断user是否有
    let user =await User.findOne({email});
    assert(user,422,"邮箱或者密码错误！")

    // 2 判断否密码匹配
    //?user === pwd
    let isEqual = await require('bcrypt').compare(password,user.password)
    assert(isEqual,422,"邮箱或者密码错误！")

    const token = jwt.sign({id:user._id,role:user.role},req.app.get("secret"))

    res.send({token})
   
})

module.exports = admin