import { JoinApplicationTemplate } from "../interfaces/JoinApplication"
import request from "./axios"

const baseUrl = 'http://localhost:8080/api'
const emailBaseUrl = 'http://localhost:8081/api'

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

export const getSystemConfig = (emailRecipientKey: string) => {
    return request({
        baseURL: baseUrl,
        url: '/systemConfigs/' + emailRecipientKey,
        method: 'get',
    })
}

export const sendJoinApplication = () => {
    return request({
        baseURL: emailBaseUrl,
        url: '/emails/joinApplication/send',
        method: 'post',
    })
}
