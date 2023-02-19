import React from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.css'
import { withRouter } from 'react-router-dom'
const { Sider } = Layout;

function SideMenu(props) {
    const items = [
        getItem('首页', 'home', <MailOutlined />),
        getItem('用户管理', 'user-manage', <AppstoreOutlined />, [
            getItem('用户列表', 'user-manage/list'),
        ]),
        getItem('权限管理', 'right-manage', <SettingOutlined />, [
            getItem('角色列表', 'right-manage/role/list'),
            getItem('权限列表', 'right-manage/right/list'),
            getItem('Option 11', '11'),
            getItem('Option 12', '12'),
        ]),
    ];
    return (
        <Sider trigger={null} collapsible collapsed={false}>
            <div className="logo" >全球新闻发布系统</div>
            <Menu
                onClick={() => props.history.push(items.key)}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['home']}
                theme='dark'
                mode="inline"
                items={items}
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