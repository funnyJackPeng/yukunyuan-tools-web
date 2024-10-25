import { Button } from "antd"
import { getJoinApplication } from "../../api"
import { log } from "console"

const JoinApplication = ()=>{
const send = ()=>{
    getJoinApplication().then((res:any)=>{
        console.log(res)
    })
}
return <div>
        申请加入页面
        <Button type="primary" onClick={send}>发送</Button>
    </div>
}

export default JoinApplication
