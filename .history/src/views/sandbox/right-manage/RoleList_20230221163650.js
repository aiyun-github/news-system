import { Table, Space, Button } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
            render: () => <Space>
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
    return (
        <>
            <Table dataSource={dataSource} columns={columns} rowKey='id'></Table>
        </>
    )
}
