const mongoose = require('mongoose');

const commentSchema =new mongoose.Schema({
    aid: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'iarticle'
    },
    uid: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'iuser'
    },
    time: {
        type:Date
    },
    content: {
        type:String
    }
})

const Comment = mongoose.model('icomment',commentSchema);

module.exports = { Comment }