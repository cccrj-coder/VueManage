//axios二次封装
import axios from 'axios'
import config from '../config'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
    constructor(baseUrl){
        this.baseUrl = baseUrl
    }

    getInsideConfig(){
        const config = {
            baseUrl : this.baseUrl,
            header: {}
        }
        return config
    }

    interceptors(instance){
        //添加请求拦截器
        instance.interceptors.request.use(function(config){
            //发送请求前做些什么
            return config
        }, function(error){
            //对错误请求做些什么
            return Promise.reject(error)
        })

        //添加响应拦截器
        instance.interceptors.response.use(function(response){
            //处理响应数据
            return response
        }, function(error){
            //对响应错误做些什么  
            console.log(error);
                      
            return Promise.reject(error)
        })
    }
    request(options){
        const instance = axios.create()
        options = {...this.getInsideConfig(), ...options}
        this.interceptors(instance)
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)