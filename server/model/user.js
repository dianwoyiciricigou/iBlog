const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        //admin 超管
        //normal 普通用户
        type:String,
        required:true
    },
    state:{
        //0 启用
        //1 禁用
        type:Number,
        default:0
    }
})


const User = mongoose.model('iuser',userSchema);


// async function fn() {
//     const salt = await bcrypt.genSalt(10);
// 	const pass = await bcrypt.hash('1234567',salt);

// 	const user = await User.updateOne({username:""}{		
// 		username:'hx',
// 		email:'1258849260@qq.com',
// 		password:pass,
// 		role:'admin',
// 		state:0
// 	})
// }
// fn()


module.exports = { User }