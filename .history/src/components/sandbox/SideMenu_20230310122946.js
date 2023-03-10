import React, { useEffect, useState } from 'react'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.css'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
const { Sider } = Layout;

// 侧边栏菜单组件
function SideMenu(props) {
    const [menu, setMenu] = useState([])
    useEffect(() => {
        getData()
    }, [])
    // 获取菜单栏数据
    const getData = () => {
        axios.get('/api/rights?_embed=children').then((res) => {
            setMenu(handleData(res.data))
        })
    }
    // key(路由)和图标映射
    const iconList = {
        '/home': <MailOutlined />,
        '/user-manage': <SettingOutlined />,
        '/right-manage': <AppstoreOutlined />,
        '/news-manage': <AppstoreOutlined />,
        '/audit-manage': <AppstoreOutlined />,
        '/publish-manage': <AppstoreOutlined />,
    }
    // 获取当前登录用户的权限列表
    const { role: { rights } } = JSON.parse(localStorage.getItem('token'))
    // 处理接口返回的数据符合menu的格式
    const handleData = (array) => {
        return array.map(item => {
            if (item.children && item.children.length) {
                if (item.pagepermisson && rights.includes(item.key)) {
                    return { key: item.key, label: item.title, icon: iconList[item.key], children: handleData(item.children) }
                }
            }
            if (item.pagepermisson && rights.includes(item.key)) {
                return { key: item.key, label: item.title, icon: iconList[item.key] }
            }
        })
    }
    // const items = [
    //     getItem('首页', '/home', <MailOutlined />),
    //     getItem('用户管理', '/user-manage', <AppstoreOutlined />, [
    //         getItem('用户列表', '/user-manage/list'),
    //     ]),
    //     getItem('权限管理', '/rights-manage', <SettingOutlined />, [
    //         getItem('角色列表', '/rights-manage/role/list'),
    //         getItem('权限列表', '/rights-manage/rights/list'),
    //     ]),
    // ];
    const selectedKeys = [props.location.pathname]
    const defaultOpenKeys = ['/' + props.location.pathname.split('/')[1]]
    return (
        <Sider trigger={null} collapsible collapsed={false}>
            <div className='side-wrap'>
                <div className="logo" >NEWS-SYSTEM</div>
                <Menu
                    className='menu'
                    onClick={(e) => props.history.push(e.key)}
                    selectedKeys={selectedKeys}
                    defaultOpenKeys={defaultOpenKeys}
                    theme='dark'
                    mode="inline"
                    items={menu}
                />
            </div>
        </Sider>
    )
}

const mapStateToProps = () => {
    
} 
export default connect()(withRouter(SideMenu))