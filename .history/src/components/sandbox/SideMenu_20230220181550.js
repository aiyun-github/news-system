import React, { useEffect, useState } from 'react'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.css'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
const { Sider } = Layout;

function SideMenu(props) {
    const [menu, setMenu] = useState([])
    const handleData = (array) => {
        return array.map(item => {
            const hasChildren = Array.isArray(item.children) && item.children.length
            if (item.children) {
                return { ...item, label: item.title, children: hasChildren ? handleData(item.children) : [] }
            }
            return { ...item, label: item.title }
        })
    }
    useEffect(() => {
        axios.get('/api/rights?_embed=children').then((res) => {
            console.log(res, 'res');
            const menu = handleData(res.data)
            console.log(menu, 'menu');
            setMenu(menu)
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