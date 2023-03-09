import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Table, Space, Tag, Modal, notification, Descriptions } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';

export default function AuditList(props) {
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
            render: (auditState) => {
                const auditList = ['未审核', '审核中', '已通过', '未通过']
                const colorList = ['black', 'orange', 'green', 'red']
                return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <Space>
                    {
                        item.auditState === 1 && <Button type='link' danger onClick={() => handleRervert(item)}>撤销</Button>
                    }
                    {
                        item.auditState === 2 && <Button type='link' onClick={() => handlePublish(item.id)}>发布</Button>
                    }
                    {
                        item.auditState === 3 && <Button type='link' onClick={() => handleUpdate(item)}>更新</Button>
                    }
                </Space>
            }
        },
    ]
    // 撤销
    const handleRervert = (item) => { 
        setDataSource(dataSource.filter(v => v.id !== item.id))
        axios.patch(`api/news/${item.id}`, {
            auditState: 0
        }).then(res => {
            notification.info({
                message: '通知',
                Descriptions: '您可以到草稿箱中查看您的新闻',
                placement: 'bottomRight'
            })
        })
    }
    // 发布
    const handlePublish = (item) => { 
        setDataSource(dataSource.filter(v => v.id !== item.id))
        axios.patch(`api/news/${item.id}`, {
            publishState: 2
        }).then(res => {
            props.history.push('/publish-manage/')
            notification.info({
                message: '通知',
                Descriptions: '您可以到【发布管理/已发布】中查看您的新闻',
                placement: 'bottomRight'
            })
        })
    }
    // 更新
    const handleUpdate = (item) => {
        props.history.push(`/news-manage/update/${item.id}`)
    }
    return (
        <>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey='id' />
        </>
    )
}
