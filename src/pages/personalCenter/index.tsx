import { Button, Card, Col, Form, Input, Modal, Row, Select,notification } from "antd"
import './index.css'
import { useEffect, useState } from "react"
import { getUserInfo, modifyUserEmail } from "../../api"
import { UserEmailInfo, UserInfo } from "../../interfaces/UserInfo"

const PersonalCenter = () => {
  const userImg = require("../../assets/images/user.png")
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm()
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>()
  const emailDomainOptions = [
    {value:"TENCENT",label:"@qq.com"},
    {value:"NETEASE",label:"@163.com"}
  ]
  const [isOpenModal, setisOpenModal] = useState(false)

  const modifyEmail = () => {
    form.validateFields().then((val:UserEmailInfo)=>{
      modifyUserEmail(val).then(()=>{
        api.success({
          message: `修改邮箱模版成功！`,
          placement: 'top',
      });
        initUserInfo()
        setisOpenModal(!isOpenModal)
      })
    })
  }

  const initUserInfo = ()=>{
    getUserInfo().then((res: any) => {
      setUserInfo(res.data)
      form.setFieldsValue(res.data)
    })
  }

  useEffect(() => {
    initUserInfo()
  }, [])

  return <Row className="personal-center">
    {contextHolder}
    <Col span={8}>
      <Card hoverable>
        <div>
          <img src={userImg}></img>
          <div className="user-info">
            <p>昵称：{userInfo?.userName}</p>
            <p>邮箱：{userInfo?.localPart}{userInfo?.emailDomain}</p>
            <p>到期时间：{userInfo?.expireTimeString}</p>
          </div>
        </div>
        <Button type="primary" size="large" onClick={()=>setisOpenModal(!isOpenModal)}>编辑邮箱</Button>
      </Card>
      <Modal title={userInfo?.localPart ? "更换邮箱" : "绑定邮箱"}
        open={isOpenModal}
        onOk={modifyEmail}
        onCancel={()=>setisOpenModal(!isOpenModal)}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign="left"
        >
          <Form.Item<UserEmailInfo>
          label="邮箱用户名："
          name="localPart"
          rules={
          [{required:userInfo?.localPart===undefined, message:"请输入邮箱用户名"}]  
          }
          >
            <Input />
          </Form.Item>
          <Form.Item<UserEmailInfo>
          label="邮箱域名："
          name="emailCompany"
          rules={
          [{required:userInfo?.localPart===undefined, message:"请选择邮箱域名"}]  
          }
          >
            <Select
            defaultValue="TENCENT"
            options={emailDomainOptions}
            />
          </Form.Item>
          <Form.Item<UserEmailInfo>
          label="邮箱授权码："
          name="emailAuthCode"
          rules={
          [{required:userInfo?.localPart===undefined, message:"请输入邮箱授权码"}]  
          }
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Col>
    <Col span={16}></Col>
  </Row>
}

export default PersonalCenter
