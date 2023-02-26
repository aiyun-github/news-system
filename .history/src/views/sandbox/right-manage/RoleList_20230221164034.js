import { Table, Space, Button, Modal } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
const { confirm } = Modal

export default function RoleList() {
    const [dataSource, setDataSource] = useState([])
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <b>{id}</b>
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
        },
        {
            title: '操作',
            render: (item) => <Space>
                {/* 气泡卡片 */}
                <Button type='link' icon={<EditOutlined />} disabled={!item.pagepermisson}>编辑</Button>
                <Button danger type='link' icon={<DeleteOutlined />} onClick={() => confirmMethod(item)}>删除</Button>
            </Space>
        }
    ]
    useEffect(() => {
        axios.get('/api/roles').then(res => {
            setDataSource(res.data)
        })
    }, [])
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
        setDataSource(dataSource.)
        axios.delete(`/api/roles/${item.id}`)
    }
    return (
        <>
            <Table dataSource={dataSource} columns={columns} rowKey='id'></Table>
        </>
    )
}
