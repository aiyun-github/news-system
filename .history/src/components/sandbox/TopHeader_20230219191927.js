import React, { useState } from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Dropdown, Space, Avatar } from 'antd';
const { Header } = Layout;

export default function TopHeader() {
    const [collapsed, setCollapsed] = useState(false)
    const changeCollapsed = () => {
        setCollapsed(!collapsed)
    }
    const items = [
        {
            key: '1',
            label: '超级管理员',
        },
        {
            key: '2',
            danger: true,
            label: '退出',
        },
    ];
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
            <div style={{ float: 'right' }}>
                <span>欢迎admin回来</span>
                <Dropdown
                    menu={{
                        items,
                    }}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <Avatar size="large" icon={<UserOutlined />} />
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </Header>
    )
}
