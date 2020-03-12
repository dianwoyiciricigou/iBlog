const jwt = require('jsonwebtoken')
const { User } = require('../model/user')
//错误处理模块
const assert = require('http-assert');
module.exports = () => {
    
    return async (req,res,next) => {

        //这是中间件，当这里执行之后再next（）才会执行之后的数据
        const token = String(req.headers.authorization || '').split(' ')[1];
        
        //1 是否成立   2 状态码   3 回传信息
        assert(token,401,"请先登录")
        
        const { id } = jwt.verify(token,req.app.get("secret"))
    
        assert(id,401,"请先登录")
    
        req.user = await User.findById(id);
    
        assert(req.user,401,"请先登录")
    
        await next()
    
    }
}