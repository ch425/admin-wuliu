import api from '../api/index'
import axios from 'axios'
import qs from 'qs'
if(window.location.href.indexOf('139.155.73.51')!=-1){
    axios.defaults.baseURL = 'http://139.155.73.51:8082'
} else {
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