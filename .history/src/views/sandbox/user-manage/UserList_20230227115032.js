import React, { useEffect, useState } from 'react'
import { Button, Table, Space, Switch, Modal, Form, Input } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
const { confirm } = Modal

// 权限列表页
export default function UserList() {
    // 存储表格列表数据
    const [dataSource, setDataSource] = useState()
    const [isAddOpen, setIsAddOpen] = useState(false)
    useEffect(() => {
        getData()
    }, [])
    // 获取表格列表数据 
    const getData = () => {
        axios.get('/api/users?_expand=role').then(res => {
            setDataSource(res.data)
        })
    }
    // 表格列
    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            render: (region) => <b>{region ? region : '全球'}</b>
        },
        {
            title: '角色名称',
            dataIndex: 'role',
            render: (role) => role?.roleName
        },
        {
            title: '用户名',
            dataIndex: 'username'
        },
        {
            title: '用户状态',
            dataIndex: 'roleState',
            render: (roleState, item) => <Switch checked={roleState} disabled={item.default}></Switch>
        },
        {
            title: '操作',
            render: (item) => {
                return <Space>
                    <Button disabled={item.default} type='link' icon={<EditOutlined />}>编辑</Button>
                    <Button disabled={item.default} danger type='link' icon={<DeleteOutlined />} onClick={() => confirmMethod(item)}>删除</Button>
                </Space>
            }
        },
    ]
    // 删除提示
    const confirmMethod = (item) => {
        confirm({
            title: '删除',
            icon: <ExclamationCircleOutlined />,
            content: '你确定删除吗？',
            onOk() {
                deleteMethod(item)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    // 删除方法
    const deleteMethod = (item) => {
        if (item.grade === 1) { // 一级菜单
            axios.delete(`/api/rights/${item.id}`)
        } else { // 二级菜单
            axios.delete(`/api/children/${item.id}`)
        }
    }
    return (
        <>
            <Button type='primary'>添加</Button>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey='id' />
            <Modal
                open={isAddOpen}
                title="添加用户"
                okText="确定"
                cancelText="取消"
                onCancel={() => setIsAddOpen(false)}
                onOk={() => setIsAddOpen(true)}
            >
                <Form
                    layout="vertical"
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please input the title of collection!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}