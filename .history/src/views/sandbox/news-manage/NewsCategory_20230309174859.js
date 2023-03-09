import React, { useEffect, useState } from 'react'
import { Button, Table, Space, Modal, notification } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
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
            title: '新闻标题',
            dataIndex: 'title',
            render: (title, item) => {
                return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
            }
        },
        {
            title: '栏目名称',
            dataIndex: 'title',
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
    // 提交审核
    const handleCheck = (id) => {
        axios.patch(`/api/news/${id}`, {
            auditState: 1,
        }).then(res => {
            // 路由跳转'审核列表'
            props.history.push('/audit-manage/list')
            // 通知框
            notification.info({
                message: `通知`,
                description:
                  `您可以到审核列表中查看您的新闻`,
                placement: 'bottomRight',
              });
        })
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
        axios.delete(`/api/news/${item.id}`)
        getData()
    }
    return (
        <>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey='id' />
        </>
    )
}