import React, { useEffect, useState } from 'react'
import { Button, Table, Tag, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios'

// 权限列表页
export default function RightList() {
    const [dataSource, setDataSource] = useState()
    useEffect(() => {
        axios.get('/api/rights').then(res => {
            setDataSource(res.data)
        })
    }, [])
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
            render: (key) => {
                return <Space>
                    <Button type='link' icon={<EditOutlined />}>编辑</Button>
                    <Button danger type='link' icon={<DeleteOutlined />}>删除</Button>
                </Space>
            }
          },
      ]
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={{pageSize: 5}}/>;
        </div>
    )
}
