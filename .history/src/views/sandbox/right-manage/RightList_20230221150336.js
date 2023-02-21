import React, { useEffect, useState } from 'react'
import { Button, Table, Tag, Space, Modal } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
const { confirm } = Modal

// 权限列表页
export default function RightList() {
    // 存储表格列表数据
    const [dataSource, setDataSource] = useState()
    useEffect(() => {
        // 获取表格列表数据
        axios.get('/api/rights?_embed=children').then(res => {
            const tableData = res.data.map(item => ({ ...item, children: item.children?.length && item.children }))
            setDataSource(tableData)
        })
    }, [])
    // 表格列
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <b>{id}</b>
        },
        {
            title: '权限名称',
            dataIndex: 'title',
        },
        {
            title: '权限路径',
            dataIndex: 'key',
            render: (key) => <Tag color='orange'>{key}</Tag>
        },
        {
            title: '操作',
            render: (item) => {
                return <Space>
                    <Button type='link' icon={<EditOutlined />}>编辑</Button>
                    <Button danger type='link' icon={<DeleteOutlined />} onClick={confirmMethod(item)}>删除</Button>
                </Space>
            }
        },
    ]
    const confirmMethod = (item) => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk() {
                deleteMethod(item)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const deleteMethod = (item) => {
    
    }
    return (
        <>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />;
        </>
    )
}