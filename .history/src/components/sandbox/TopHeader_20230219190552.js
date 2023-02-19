import React, { useState } from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
const { Header } = Layout;

export default function TopHeader() {
    const [collapsed, setCollapsed] = useState(false)
    const changeCollapsed = () => {
        setCollapsed(!collapsed)
    }
    return (
        <Header
            className="site-layout-background"
            style={{
                padding: '0 16px',
            }}
        >
            {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })} */}
            {
                collapsed
                    ? <MenuUnfoldOutlined onClick={changeCollapsed} />
                    : <MenuFoldOutlined onClick={changeCollapsed} />
            
            }
            <div style={{float: 'right'}}>
                <span>欢迎admin回来</span>
            </div>
        </Header>
    )
}
