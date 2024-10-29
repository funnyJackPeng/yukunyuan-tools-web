import { Button, Card, Col, Form, Input, Row, notification } from "antd"
import { createJoinApplication, getJoinApplication, getSystemConfig, modifyJoinApplication, sendJoinApplication } from "../../api"
import { useEffect, useState } from "react"
import { joinApplication } from "../../constant/emailRecipientKeys"
import './index.css'
import dayjs from "dayjs"
import { JoinApplicationTemplate } from "../../interfaces/JoinApplication"

const JoinApplication = () => {
    const [api, contextHolder] = notification.useNotification();
    const [template, setTmplate] = useState<JoinApplicationTemplate | undefined>()
    const [recipient, setRecipient] = useState("")
    const [form] = Form.useForm()
    const getTemplate = () => {
        getJoinApplication().then(({ data }) => {
            setTmplate(data)
            form.setFieldsValue(data)
        })
    }

    const saveTemplate = () => {
        form.validateFields().then((val: JoinApplicationTemplate) => {
            if (template === undefined) {
                createJoinApplication(val).then((res: any) => {
                    api.success({
                        message: `创建模版成功`,
                        placement: 'top',
                    });
                    getTemplate()
                })
            } else {
                modifyJoinApplication(val).then((res: any) => {
                    api.success({
                        message: `保存模版成功`,
                        placement: 'top',
                    });
                    getTemplate()
                })
            }
        })
    }

    const send = () => {
        sendJoinApplication().then((res: any) => {
            console.log("发送请求的地方", res)
            switch (res.status) {
                case 200: {
                    api.success({
                        message: `发送成功`,
                        description:
                            '邮件成功发送啦！',
                        placement: 'top',
                    });
                    break;
                }
                case 400: {
                    api.error({
                        message: `发送失败`,
                        description:
                            res.message,
                        placement: 'top',
                    });
                    break;
                }
                default: {
                    api.error({
                        message: `发送失败`,
                        description:
                            "系统错误",
                        placement: 'top',
                    });
                    break;
                }
            }
        })
    }
    useEffect(() => {
        getSystemConfig(joinApplication).then(({ data }) => {
            setRecipient(data.result)
        })
    }, [])
    useEffect(() => { getTemplate() }, [])
    return <Row>
        {contextHolder}
        <Col span={16}>
            <Card title="加入申请" hoverable >
                <div className="email-content">
                    <p>收件人：{recipient} </p>
                    <p>邮件主题：{<span>{template?.referrerNumber}</span>}推{<span>{template?.ownNumber}</span>}加{<span>{template?.amount}</span>}</p>
                    <p>邮件正文：</p>
                    <br />
                    <p>诚信共赢社区管理处：</p>
                    <p>我姓{<span>{template?.surname}</span>}，{<span>{template?.gender}</span>}性，昵称{<span>{template?.nickName}</span>}；居住地{<span>{template?.address}</span>}。现申请加入诚信共赢社区，特声明如下：</p>
                    <p>1.认同互助思想理念，遵守诚信共赢社区相关规定。</p>
                    <p>2.拥护诚信共赢社区指导方针：“无偿援助，互惠和仁爱”。 </p>
                    <p>3.明白“参与诚信共赢社区，本身就是愿意提供无偿援助的明确表示”，认同社区共识“参与社区等于自愿捐助”。 </p>
                    <p>4.承诺闲钱参与，不动用关键资金，绝不借贷参与。 </p>
                    <p>5.承诺不利用诚信共赢平台从事任何政治、宗教、黄赌毒及其他犯罪活动；不攻击、诽谤任何国家、政府、政党、组织、企业或个人。 </p>
                    <p>6.阅读了警告，完全了解所有风险，决定参与诚信共赢社区。本人心智健全，具有完全民事行为能力，能对自己的行为完全负责，即使有资金损失，也完全由自己负责，决不怪罪任何人。 </p>
                    <p>申请人：{<span>{template?.ownNumber}</span>}</p>
                    <p>推荐人：{<span>{template?.referrerNumber}</span>}</p>
                    <p>日期：{dayjs(new Date()).format("YYYY-MM-DD")}</p>
                </div>
                <div>
                    <Button type="primary" size="large" onClick={send}>发送</Button>
                </div>
            </Card>
        </Col>
        <Col span={8}>
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={saveTemplate}
            >
                <Form.Item<JoinApplicationTemplate>
                    label="推荐人编号"
                    name="referrerNumber"
                    rules={[{ required: template === undefined, message: "请输入推荐人编号" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<JoinApplicationTemplate>
                    label="自己的编号"
                    name="ownNumber"
                    rules={[{ required: template === undefined, message: "请输入自己的编号" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<JoinApplicationTemplate>
                    label="金额"
                    name="amount"
                    rules={[{ required: template === undefined, message: "请输入金额" }]}
                >
                    <Input type="number" />
                </Form.Item>

                <Form.Item<JoinApplicationTemplate>
                    label="姓"
                    name="surname"
                    rules={[{ required: template === undefined, message: "请输入姓氏" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<JoinApplicationTemplate>
                    label="性别"
                    name="gender"
                    rules={[{ required: template === undefined, message: "请输入性别" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<JoinApplicationTemplate>
                    label="昵称"
                    name="nickName"
                    rules={[{ required: template === undefined, message: "请输入昵称" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<JoinApplicationTemplate>
                    label="地址"
                    name="address"
                    rules={[{ required: template === undefined, message: "请输入地址" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" size="large" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </Col>
    </Row>
}

export default JoinApplication
