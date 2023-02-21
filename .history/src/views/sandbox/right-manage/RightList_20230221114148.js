import React, { useEffect, useState } from 'react'
import { Button, Table, Tag, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios'

// 权限列表页
export default function RightList() {
    const [dataSource, setDataSource] = useState()
    useEffect(() => {
        axios.get('/api/rights?_embed=children').then(res => {
            const tableData = res.data.map(item => ({...item, children: item.children?.length && item.children}))
            setDataSource(tableData)
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
                    <Button danger type='link' icon={<DeleteOutlined />} onClick={}>删除</Button>
                </Space>
            }
          },
      ]
    return (
        <>
            <Table dataSource={dataSource} columns={columns} pagination={{pageSize: 5}}/>;
        </>
    )
}
