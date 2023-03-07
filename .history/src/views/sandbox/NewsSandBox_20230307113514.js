import React from 'react'
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import Progress from 'Progress';
import 'nprogress/nprogress.css'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import NewsRouter from '../../components/sandbox/NewsRouter';
import './NewsSandBox.css'

const { Content } = Layout

// 路由组件
export default function NewsSandBox() {
    Progress.start()
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
                        overflow: 'auto'
                    }}
                >
                    <NewsRouter></NewsRouter>
                    {/* <Redirect to='/login/'/> */}
                </Content>
            </Layout>
        </Layout>
    )
}
