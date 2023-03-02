import React, { useState } from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Dropdown, Avatar } from 'antd';
import { withRouter } from 'react-router-dom'
const { Header } = Layout;

// 顶部header组件
function TopHeader(props) {
    const [collapsed, setCollapsed] = useState(false)
    const changeCollapsed = () => {
        setCollapsed(!collapsed)
    }

    const users = JSON.parse(localStorage.getItem('token'))
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
    const onClick = ({ key }) => {
        switch(key) {
            case '1':
                break
            case '2': // 退出
                localStorage.removeItem('token')
                props.history.replace('/login')
                break
            default:
        }
      };
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
                        onClick
                    }}
                >
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Header>
    )
}
export default withRouter(TopHeader)