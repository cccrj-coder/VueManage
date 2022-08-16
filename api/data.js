import axios from "./axios";

//因为mock拦截掉请求，所以需要定义一些接口请求

export const getMenu = (params) => {
    return axios.request({
        url: '/permission/getMenu',
        methods: 'get',
        data: params
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData'
    })
}

export const getUser = (params) => {
    return axios.request({
        url: 'user/getUser',
        methods: 'get',
        params
    })
}


