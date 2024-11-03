import { JoinApplicationTemplate } from "../interfaces/JoinApplication"
import { UserEmailInfo } from "../interfaces/UserInfo"
import request from "./axios"

const isProductEnvironment = process.env.REACT_APP_IS_PROD_ENV
const baseUrl = isProductEnvironment? 'https://www.ykytools.top/api' :'http://localhost:8080/api'
const emailBaseUrl = isProductEnvironment? 'https://www.ykytools.top/api' :'http://localhost:8081/api'

export const getJoinApplication = () => {
    return request({
        baseURL: baseUrl,
        url: '/joinApplications',
        method: 'get',

    })
}

export const createJoinApplication = (data:JoinApplicationTemplate) => {
    return request({
        baseURL: baseUrl,
        url: '/joinApplications',
        method: 'post',
        data
    })
}

export const modifyJoinApplication = (data:JoinApplicationTemplate) => {
    return request({
        baseURL: baseUrl,
        url: '/joinApplications',
        method: 'put',
        data
    })
}

export const sendJoinApplication = () => {
    return request({
        baseURL: emailBaseUrl,
        url: '/emails/joinApplication/send',
        method: 'post',
    })
}

export const getSystemConfig = (emailRecipientKey: string) => {
    return request({
        baseURL: baseUrl,
        url: '/systemConfigs/' + emailRecipientKey,
        method: 'get',
    })
}

export const getUserInfo = ()=>{
    return request({
        baseURL: baseUrl,
        url:'/userInfos',
        method: 'get',
    })
}

export const modifyUserEmail = (userEmailInfo:UserEmailInfo)=>{
    return request({
        baseURL: baseUrl,
        url:'/userInfos',
        method: 'put',
        data:userEmailInfo
    })
}
