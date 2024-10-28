import request from "./axios"

export const getJoinApplication =()=>{
    return request({
        url:'/joinApplications',
        method: 'get',
     
    })
}
export const getSystemConfig =(emailRecipientKey:string)=>{
    return request({
        url:'/systemConfigs/'+emailRecipientKey,
        method: 'get',
    })
}
