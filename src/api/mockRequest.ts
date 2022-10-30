import axios from "axios";
import nprogress from "nprogress";
import 'nprogress/nprogress.css'

const req = axios.create({
    baseURL:'/mock',
    timeout:5000
})
req.interceptors.request.use((config)=>{
    nprogress.start();
    
    return config
})
req.interceptors.response.use(
    (response)=>{
        nprogress.done();
        return response.data
    },
    (error)=>{
        nprogress.done();
        return error
    }
)
export default req;