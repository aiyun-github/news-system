import React, { useEffect, useState } from 'react'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.css'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
const { Sider } = Layout;

function SideMenu(props) {
    const [menu, setMenu] = useState([])
    // 处理接口返回的数据符合menu的格式
    const handleData = (array) => {
        return array.map(item => {
            if (item.children && item.children.length) {
                return item.pagePermission && { key: item.key, label: item.title, children: handleData(item.children) }
            }
            return item.pagepermisson && { key: item.key, label: item.title }
        })
    }
    useEffect(() => {
        axios.get('/api/rights?_embed=children').then((res) => {
            console.log(res.data);
            setMenu(handleData(res.data))
        })
    }, [])

    const items = [
        getItem('首页', '/home', <MailOutlined />),
        getItem('用户管理', '/user-manage', <AppstoreOutlined />, [
            getItem('用户列表', '/user-manage/list'),
        ]),
        getItem('权限管理', '/rights-manage', <SettingOutlined />, [
            getItem('角色列表', '/rights-manage/role/list'),
            getItem('权限列表', '/rights-manage/rights/list'),
        ]),
    ];
    return (
        <Sider trigger={null} collapsible collapsed={false}>
            <div className="logo" >新闻发布系统</div>
            <Menu
                onClick={(e) => props.history.push(e.key)}
                defaultSelectedKeys={['home']}
                defaultOpenKeys={['user-manage']}
                theme='dark'
                mode="inline"
                items={menu}
            />
        </Sider>
    )
}

export default withRouter(SideMenu)

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}