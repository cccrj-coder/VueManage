import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permission from './mockServeData/permission'

//定义一些拦截器

//拦截请求主页面
Mock.mock('/home/getData', homeApi.getStatisticalData)

//拦截请求添加和更新用户
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)

//拦截编辑用户和删除用户

Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/del/, 'post', userApi.deleteUser)

//拦截登录请求
Mock.mock(/permission\/getMenu/, 'get', permission.getMenu)