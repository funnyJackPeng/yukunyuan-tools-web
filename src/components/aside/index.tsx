import React from "react";
import {
    FormOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { setTabList } from "../../store/reducers/tab";
const { Sider } = Layout;


const items = [
    {
        key:'/home',
        icon: <FormOutlined />,
        label:'主页'
    },
    {
    key:'/joinApplication',
    icon: <FormOutlined />,
    label:'加入申请'
}
]

const CommonAside = () => {
       //获取展开收起的状态
       const collapsed = useSelector((state:any) => state.tab.isCollapse)
    const navigate = useNavigate()
    const dispath = useDispatch()
    // dispath(setTabList(val))
    const selectMenu = (e:any)=>{
        // let data
        // MenuConfig.forEach(item=>{
        //     if(item.path === e.keyPath[e.keyPath.length-1]){
        //         data = item
        //         if(e.keyPath.length>1){
        //             data = item.children.find(child=>{return child.path == e.key})
        //         }
        //     }
        // })
        // dispath(setTabList({path:data.path,name:data.name,label:data.label}))
            navigate(e.key)
        }
    return (
        <Sider trigger={null} collapsed={collapsed}>
            <h3 className="app-name">{collapsed ? '小工具' : '宇坤园小工具'}</h3>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/home']}
                items={items}
                onClick={selectMenu}
                style={{
                    height: '100%'
                }} />
        </Sider>
    );
}

export default CommonAside