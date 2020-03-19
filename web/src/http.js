import axios from 'axios'

const http = axios.create({
    baseURL:process.env.VUE_APP_API_URL || '/home/api'
    //baseURL:'http://localhost:3000/home/api'
})


export default http