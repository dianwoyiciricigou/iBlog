const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String,
        minlength:2,
        maxlength:50
    },
    updateT:{
        type:Date,
        default:Date.now
    },
    cover:{
        type:String,
        default:null
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"iuser",
        required:[true,"请传入作者姓名"]
    },
    content:{
        type:String
    }
})

const Article = mongoose.model('iarticle',articleSchema)

// async function fn() {
//     await Article.create({
//         title:"hello hx!",
//         author:"5e67a856fb322e906c1c44ad",
//         content:"do you do"
//     })
// }

// fn()
module.exports = { Article }