import request from "./axios"

export const getJoinApplication =()=>{
    return request({
        url:'/joinApplications',
        method: 'get',
     
    })
}
