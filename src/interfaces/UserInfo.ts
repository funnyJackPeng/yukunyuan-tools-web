export interface UserInfo{
    id:number,
    avatarUrl:string,
    emailAuthCode:string,
    emailDomain:string,
    expireTime:string,
    expireTimeString:string,
    localPart:string,
    openid:string,
    userName:string
}

export interface UserEmailInfo{
    localPart:string,
    emailCompany:string,
    emailAuthCode:string,
}
