const express = require('express')
const { Article } = require('../model/article')
const { Comment } = require('../model/comment')
const { User } = require('../model/user')


const home = express.Router()

home.get('/:id',async (req,res) => {

    if(req.params.id == 'articles') {
        const articles = await Article.find({}).populate('author')

        articles[articles.length] =req.app.userInfo ?  req.app.userInfo._id : false

        res.send(articles)
    }

    if(req.params.id == 'article') {

        const article = await Article.find({_id:req.query._id}).populate('author')

        res.send(article)
    }
})

home.get('/article/comments', async(req,res) => {
    const comments = await Comment.find(req.query).populate('uid')
    res.send(comments)
})

home.post('/comments',async (req,res) => {

    await Comment.create(req.body)
    
    res.send({success:true})
})

home.get('/article/userInfo',async (req,res) => {
    const user = await User.find({_id:req.query.uid})
    res.send(user)
})
module.exports = home