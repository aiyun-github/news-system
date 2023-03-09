import React, { useEffect, useState } from 'react'
import { Button, Table, Space, Modal } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios'
const { confirm } = Modal

// 草稿箱列表页
export default function NewsDraft() {
    // 存储表格列表数据
    const [dataSource, setDataSource] = useState()

    const { username } = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        getData()
    }, [username])
    const getData = () => {
        // 获取表格列表数据
        axios.get(`/api/news?author=${username}&auditState=0&_expand=category`).then(res => {
            setDataSource(res.data)
        })
    }
    // 表格列
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <b>{id}</b>
        },
        {
            title: '新闻标题',
            dataIndex: 'title',
        },
        {
            title: '作者',
            dataIndex: 'author',
        },
        {
            title: '新闻分类',
            dataIndex: 'category',
            render: (category) => category.title
        },
        {
            title: '操作',
            render: (item) => {
                return <Space>
                    <Button type='link' icon={<EditOutlined />} disabled={!item.pagepermisson}>编辑</Button>
                    <Button danger type='link' icon={<DeleteOutlined />} onClick={() => confirmMethod(item)}>删除</Button>
                    <Button danger type='link' icon={<UploadOutlined />} onClick={() => confirmMethod(item)}>发布</Button>
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
        axios.delete(`/api/news/${item.id}`)
        getData()
    }
    return (
        <>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey='id' />;
        </>
    )
}