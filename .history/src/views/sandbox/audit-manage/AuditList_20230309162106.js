import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Table, Space, Modal, notification } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';

export default function AuditList() {
    // 存储表格列表数据
    const [dataSource, setDataSource] = useState()

    const { username } = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        getData()
    }, [username])
    const getData = () => {
        // 获取表格列表数据 （_ne表示不等于,_lte表示小于等于）
        axios.get(`/api/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res => {
            setDataSource(res.data)
        })
    }
    // 表格列
    const columns = [
        {
            title: '新闻标题',
            dataIndex: 'title',
            render: (title, item) => {
                return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
            }
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
            title: '审核状态',
            dataIndex: 'auditState',
            render: (auditState) => auditState
        },
        {
            title: '操作',
            render: (item) => {
                return <Space>
                    <Button type='link' icon={<EditOutlined />} onClick={() => {
                        props.history.push(`/news-manage/update/${item.id}`)
                    }}>编辑</Button>
                    <Button type='link' icon={<UploadOutlined />} onClick={() => handleCheck(item.id)}>提交审核</Button>
                    <Button danger type='link' icon={<DeleteOutlined />} onClick={() => confirmMethod(item)}>删除</Button>
                </Space>
            }
        },
    ]
    return (
        <>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey='id' />
        </>
    )
}
