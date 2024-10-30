import { Card, Col, Row } from "antd"
import './index.css'
const PersonalCenter = ()=>{
    const userImg = require("../../assets/images/user.png")
    return <Row className="personal-center">
        <Col span={8}>
        <Card hoverable>
          <div className="user">
            <img src={userImg}></img>
            <div className="userinfo">
              <p className="name">Admin</p>
              <p className="access">超级管理员</p>
            </div>
          </div>
          <div className="login-info">
            <p>上次登录时间为: <span>2024-10-12</span></p>
            <p>上次登录地点为: <span>武汉</span></p>
          </div>
        </Card>
        </Col>
        <Col span={16}></Col>
    </Row>
}

export default PersonalCenter
