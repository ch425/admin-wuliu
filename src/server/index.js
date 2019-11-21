import api from '../api/index'
import axios from 'axios'
import qs from 'qs'
if(window.location.href.indexOf('139.155.73.51')!=-1){
    console.log('线上')
    axios.defaults.baseURL = 'http://139.155.73.51:8082'
} else {
    console.log('线下')
    axios.defaults.baseURL = 'http://localhost:8082'
}
// 登录
export function Login(params){
    return new Promise((resolve,reject)=>{
        axios({
            url: api.login_api,
            method: 'POST',
            headers:{
                "Content-Type": 'application/json'
            },
            data: params
        }).then(data=>{
            resolve(data)
        }).catch(error=>{
            console.log(error)
        })
    })
}

// 导入用户信息表格
export function importFile (params){
    return new Promise((resolve, reject)=>{
        axios({
            url: api.importUser_api,
            method: 'POST',
            data: params,
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(data=>{
            resolve(data)
        }).catch(error=>{
            console.log(error)
        })
    })
}

// 学生信息管理接口
export function getStudentInfo(){
    return new Promise((resolve,reject)=>{
        axios({
            url: api.getStudent_api,
            method: 'GET'
        }).then(data=>{
            resolve(data)
        }).catch(error=>{
            console.log(error)
        })
    })
}


// 获取公告列表
export function GetAnnouncement(params){
    return new Promise((resolve,reject)=>{
        axios({
            url: api.getAnnouncement_api,
            method: "POST",
            data: qs.stringify(params),
            headers:{
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        }).then(data=>{
            resolve(data)
        }).catch(error=>{
            console.log(error)
        })
    })
}

// 添加公告
export function AddAnnouncement(params){
    return new Promise((resolve,reject)=>{
        axios({
            url: api.addAnnouncement_api,
            method: 'POST',
            headers:{
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(params)
        }).then(data=>{
            resolve(data)
        }).catch(error=>{
            console.log(error)
        })
    })
}

// 发送邮件
export function SendEmail(params){
    return new Promise((resolve,reject)=>{
        axios({
            url: api.sendEmail_api,
            method: 'POST',
            headers:{
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(params)
        }).then(data=>{
            resolve(data)
        }).catch(error=>{
            console.log(error)
        })
    })
}


// 添加活动图片
export function addActivityPhoto(params) {
    return new Promise((resolve,reject)=>{
        axios({
            url: api.addActivityPhoto_api,
            method: 'POST',
            headers:{
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(params)
        }).then(data=>{
            resolve(data)
        }).catch(error=>{
            console.log(error)
        })
    })
}

// 查询活动图片列表
export function queryActivityPhoto(params){
    return new Promise((resolve,reject)=>{
        axios({
            url: api.queryActivityPhoto_api,
            method: 'POST',
            headers:{
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(params)
        }).then(data=>{
            resolve(data)
        }).catch(error=>{
            console.log(error)
        })
    })
}