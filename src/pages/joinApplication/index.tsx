import { Button, Card, Col, Row } from "antd"
import { getJoinApplication, getSystemConfig } from "../../api"
import { useEffect, useState } from "react"
import { joinApplication } from "../../constant/emailRecipientKeys"
import './index.css'
import dayjs from "dayjs"

interface JoinApplicationTemplate {
    address: string,
    amount: number,
    gender: string,
    nickName: string,
    ownNumber: string,
    referrerNumber: string,
    surname: string
}

const JoinApplication = () => {
    const [template, setTmplate] = useState<JoinApplicationTemplate>({
        address: "",
        amount: 0,
        gender: "",
        nickName: "",
        ownNumber: "",
        referrerNumber: "",
        surname: ""
    })
    const [recipient, setRecipient] = useState("")
    const getTemplate = () => {
        getJoinApplication().then(({ data }) => {
            setTmplate(data)
        })
    }

    useEffect(() => {
        getSystemConfig(joinApplication).then(({ data }) => {
            setRecipient(data.result)
        })
    }, [])
    useEffect(() => { getTemplate() }, [])
    return <Row>
        <Col span={16}>
            <Card title="加入申请" hoverable >
                <div className="email-content">
                    <p>收件人：{recipient} </p>
                    <p>邮件主题：{<span>{template.referrerNumber}</span>}推{<span>{template.ownNumber}</span>}加{<span>{template.amount}</span>}</p>
                    <p>邮件正文：</p>
                    <br />
                    <p>诚信共赢社区管理处：</p>
                    <p>我姓{<span>{ template.surname }</span>}，{<span>{ template.gender }</span>}性，昵称{<span>{ template.nickName }</span>}；居住地{<span>{ template.address }</span>}。现申请加入诚信共赢社区，特声明如下：</p>
                    <p>1.认同互助思想理念，遵守诚信共赢社区相关规定。</p>
                    <p>2.拥护诚信共赢社区指导方针：“无偿援助，互惠和仁爱”。 </p>
                    <p>3.明白“参与诚信共赢社区，本身就是愿意提供无偿援助的明确表示”，认同社区共识“参与社区等于自愿捐助”。 </p>
                    <p>4.承诺闲钱参与，不动用关键资金，绝不借贷参与。 </p>
                    <p>5.承诺不利用诚信共赢平台从事任何政治、宗教、黄赌毒及其他犯罪活动；不攻击、诽谤任何国家、政府、政党、组织、企业或个人。 </p>
                    <p>6.阅读了警告，完全了解所有风险，决定参与诚信共赢社区。本人心智健全，具有完全民事行为能力，能对自己的行为完全负责，即使有资金损失，也完全由自己负责，决不怪罪任何人。 </p>
                    <p>申请人：{<span>{ template.ownNumber }</span>}</p>
                    <p>推荐人：{<span>{ template.referrerNumber }</span>}</p>
                    <p>日期：{dayjs(new Date()).format("YYYY-MM-DD")}</p>
                </div>
            </Card>
        </Col>
        <Col span={8}>
            修改模板部分
        </Col>

    </Row>
}

export default JoinApplication
