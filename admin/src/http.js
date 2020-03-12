import axios from 'axios';
import Vue from 'vue'
import router from './router';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const http = axios.create({
    baseURL:"http://localhost:3000/admin/api"
})

http.interceptors.request.use(function (config) {
    config.headers.Authorization = "Bearer " + localStorage.token
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

http.interceptors.response.use(res=>{
    return res
},err=>{
    if (err.response.data.msg) {
        Vue.prototype.$message.error(err.response.data.msg)
    }
    
    //返回状态码401就重定向到login界面
    if(err.response.status === 401) {
        router.push('/login')
    }

    return Promise.reject(err)
})
export default http;