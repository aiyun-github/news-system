import React, { useEffect, useState } from 'react'
import { Button, Table, Tag, Space, Modal, Popover, Switch } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
const { confirm } = Modal

// 权限列表页
export default function UserList() {
    // 存储表格列表数据
    const [dataSource, setDataSource] = useState()
    useEffect(() => {
        getData()
    }, [])
    // 获取表格列表数据 
    const getData = () => {
        axios.get('/api/users').then(res => {
            setDataSource(res.data)
        })
    }
    // 表格列
    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            render: (region) => <b>{region}</b>
        },
        {
            title: '角色名称',
            dataIndex: 'roleId',
        },
        {
            title: '用户名',
            dataIndex: 'key',
            render: (key) => <Tag color='orange'>{key}</Tag>
        },
        {
            title: '操作',
            render: (item) => {
                return <Space>
                    {/* 气泡卡片 */}
                    <Popover
                        content={<div style={{ textAlign: 'center' }}>
                            <Switch checked={item.pagepermisson} onChange={() => switchMethod(item)}></Switch>
                        </div>}
                        title="页面配置项" trigger={item.pagepermisson ? 'click' : ''}
                    >
                        <Button type='link' icon={<EditOutlined />} disabled={!item.pagepermisson}>编辑</Button>
                    </Popover>
                    <Button danger type='link' icon={<DeleteOutlined />} onClick={() => confirmMethod(item)}>删除</Button>
                </Space>
            }
        },
    ]
    // 页面配置
    const switchMethod = (item) => {
        item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
        setDataSource([...dataSource])
        if (item.grade === 1) { // 一级菜单
            // patch补丁请求，只会更改所传的数据
            axios.patch(`/api/rights/${item.id}`,{pagepermisson: item.pagepermisson})
        } else { // 二级菜单
            axios.patch(`/api/children/${item.id}`,{pagepermisson: item.pagepermisson})
        }
    }
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
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />;
        </>
    )
}