import React, { useEffect, useState } from 'react'
import { Button, Table, Space, Modal } from 'antd'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
const { confirm } = Modal

//【新闻管理-新闻分类】
export default function NewsCategory(props) {
    // 存储表格列表数据
    const [dataSource, setDataSource] = useState()

    useEffect(() => {
        axios.get('/api/categories').then(res => {
            setDataSource(res.data)
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
            title: '栏目名称',
            dataIndex: 'title',
        },
        {
            title: '操作',
            render: (item) => {
                return <Space>
                    <Button danger type='link' icon={<DeleteOutlined />} onClick={() => confirmMethod(item)}>删除</Button>
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
        setDataSource(dataSource.filter(v => v.id !== item.id))
        axios.delete(`/api/categories/${item.id}`)
    }
    return (
        <>
            <Table
                components={components}
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 5 }}
                rowKey='id'
            />
        </>
    )
}