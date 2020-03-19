const path = require('path')
const express = require('express');
const jwt = require('jsonwebtoken')
const { User } = require('../model/user')
const { Article } = require('../model/article')
const bcrypt = require('bcrypt');
const formidable = require('formidable')

//错误处理模块
const assert = require('http-assert');

const admin = express.Router()

//登录鉴权中间件
const auth = require('../middleWare/middleAuth')
admin.get('/admin',auth(),(req,res)=>{
    res.send(req.app.locals.userInfo)
})

admin.get('/user',async(req,res)=>{
    const users = await User.find({})
    res.send(users)
})

admin.post('/login',async (req,res)=>{
    const { email,password } = req.body
    // 1 判断user是否有
    let user =await User.findOne({email});
    assert(user,422,"邮箱或者密码错误！")

    // 2 判断否密码匹配
    //?user === pwd
    let isEqual = await require('bcrypt').compare(password,user.password)
    assert(isEqual,422,"邮箱或者密码错误！")

    const token = jwt.sign({id:user._id,role:user.role},req.app.get("secret"))
    req.app.userInfo = user
    res.send({token})
   
})

admin.post('/userEdit',async (req,res) => {
    const {email} = req.body
    const user =await User.findOne({email})
    
    if(!user) {
        const salt = await bcrypt.genSalt(10)

        const password = await bcrypt.hash(req.body.password,salt)

        req.body.password = password
        
        await User.create(req.body)

        res.send('ok')
    }

    assert(!user,422,"邮箱已注册，请用新邮箱！")
    
})

admin.put('/userEdit',async (req,res) => {
    let {email,username,password,role,state} = req.body
    const user =await User.findOne({email})
    
    const isEqual =await bcrypt.compare(password,user.password)

    assert(isEqual,422,"你的密码不正确，不能修改用户！")
    
    if(isEqual) {
        await User.updateOne({email},{
            username,role,state
        })
        res.send('ok')
    }   
})

admin.delete('/userEdit',async (req,res) => {
    const { email } = req.query
    await User.findOneAndDelete({email})
})


//----------------------------------------------------------------------------------------------------------------
//动态的params还是静态的名称，谁在前面就先执行谁
admin.get('/article',async (req,res) => {
    const article = await Article.find({}).populate("author")
    res.send(article)
})

//图片上传
admin.post('/upload',(req,res) => {
    const form = new formidable.IncomingForm()

    form.uploadDir = path.join(__dirname,'../','upload')

    form.keepExtensions = true

    form.parse(req,async (err,fields,files) => {
        if(files.image) {
            files.url = `http://localhost:3000/upload/${files.image.path.split('upload\\')[1]}`
            res.send(files)
        } else {
            files.url = `http://localhost:3000/upload/${files.file.path.split('upload\\')[1]}`
            res.send(files)
        }
    })
})

admin.post('/articleAdd',async (req,res) => {
    await Article.create(req.body)
    res.send('ok')
})

admin.get('/articleEdit',async (req,res) => {
    const result = await Article.findById(req.query._id)

    res.send(result)
})

admin.put('/articleEdit',async (req,res) => {
    const { _id } = req.query

    await Article.findByIdAndUpdate(_id,req.body)
    res.send('ok')
})

admin.delete('/articleEdit',async (req,res) => {
    await Article.findOneAndDelete({_id:req.query.aid})
    res.send('ok')
})
module.exports = admin