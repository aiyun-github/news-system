import React, { useEffect, useState } from 'react'
import { Button, Table, Space, Switch, Modal, Form, Input, Select } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
const { confirm } = Modal
const { Option } = Select

// 权限列表页
export default function UserList() {
    // 存储表格列表数据
    const [dataSource, setDataSource] = useState()
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [roleList, setRoleList] = useState([])
    const [regionList, setRegionList] = useState([])
    useEffect(() => {
        getData()
        getRoleList()
        getRegionList()
    }, [])
    // 获取表格列表数据 
    const getData = () => {
        axios.get('/api/users?_expand=role').then(res => {
            setDataSource(res.data)
        })
    }
    // 获取角色
    const getRoleList = () => {
        axios.get('/api/role').then(res => {
            setRoleList(res.data)
        })
    }
    // 获取区域
    const getRegionList = () => {
        axios.get('/api/region').then(res => {
            setRegionList(res.data)
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
            <Button type='primary' onClick={() => setIsAddOpen(true)}>添加</Button>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey='id' />
            <Modal
                open={isAddOpen}
                title="添加用户"
                okText="确定"
                cancelText="取消"
                onCancel={() => setIsAddOpen(false)}
                onOk={() => setIsAddOpen(false)}
            >
                <Form
                    layout="vertical"
                >
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[{ required: true, message: 'Please input the username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[{ required: true, message: 'Please input the password!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="region"
                        label="区域"
                        rules={[{ required: true, message: 'Please input the password!' }]}
                    >
                        <Select>
                            {
                                regionList.map(item => {
                                    return <Option valut={item.id}>{item.}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="roleId"
                        label="角色"
                        rules={[{ required: true, message: 'Please input the role!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}