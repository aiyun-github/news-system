import React, { useEffect } from 'react'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.css'
import { withRouter } from 'react-router-dom'
const { Sider } = Layout;

function SideMenu(props) {
    useEffect(() => {
        axios.get('/api/rights?_embed=children')
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