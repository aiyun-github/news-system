import React from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.css'
const { Sider } = Layout;

export default function SideMenu() {
    const items = [
        getItem('首页', 'home', <MailOutlined />),
        getItem('用户管理', 'user-manage', <AppstoreOutlined />, [
            getItem('用户列表', 'user-manage/list'),
        ]),
        getItem('权限管理', 'right-manage', <SettingOutlined />, [
            getItem('角色列表', 'right-manage/role/list'),
            getItem('权限列表', 'right-manage'),
            getItem('Option 11', '11'),
            getItem('Option 12', '12'),
        ]),
    ];
    return (
        <Sider trigger={null} collapsible collapsed={false}>
            <div className="logo" >全球新闻发布系统</div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
            />
        </Sider>
    )
}

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}