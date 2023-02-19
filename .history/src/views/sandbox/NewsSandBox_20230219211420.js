import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import Home from './home/Home'
import NoPermission from './no-permission/NoPermission'
import RightList from './rights-manage/RightsList'
import RoleList from './rights-manage/RoleList'
import UserList from './user-manage/UserList'
import './NewsSandBox.css'
import { Layout, Menu } from 'antd';
const { Content } = Layout

export default function NewsSandBox() {
    return (
        <Layout>
            <SideMenu></SideMenu>
            <Layout className="site-layout">
                <TopHeader></TopHeader>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Switch>
                        <Route path='/home' component={Home} />
                        <Route path="/user-manage/list" component={UserList} />
                        <Route path="/rights-manage/role/list" component={RoleList} />
                        <Route path="/rights-manage/rights/list" component={RightList} />
                        <Redirect from="/" to="/home" exact />
                        <Route path="*" component={NoPermission} />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}
