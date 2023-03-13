import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Space } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
const { Header } = Layout;

// 顶部header组件
function TopHeader(props) {
    const { role: { roleName }, username } = JSON.parse(localStorage.getItem('token'))

    const items = [
        {
            key: '1',
            label: roleName,
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
                props.isCollapsed
                    ? <MenuUnfoldOutlined onClick={() => props.changeCollapsed()} />
                    : <MenuFoldOutlined onClick={() => props.changeCollapsed()} />

            }
            <Space style={{ float: 'right' }}>
                <a href='#/news'>去前台</a>
                <span>欢迎<span style={{color: '#1890ff'}}>{username}</span>回来</span>
                <Dropdown
                    menu={{
                        items,
                        onClick
                    }}
                >
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </Space>
        </Header>
    )
}
const mapStateToProps = ({CollApsedReducer: {isCollapsed}}) => {
    return {
        isCollapsed,
    }
}

const mapDispatchToProps = {
    changeCollapsed() {
        return {
            type: 'change_collapsed',
            // payload,
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopHeader))