import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Table, Space, Tag, notification } from 'antd'

export default function Audit() {
    const [dataSource, setDataSource] = useState([])
    const { roleId, region, username } = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        const roleObj = {
            '1': 'superadmin',
            '2': 'admin',
            '3': 'editor'
        }
        axios.get(`/api/news?auditState=1&_expand=category`).then(res => {
            const list = res.data
            setDataSource(roleObj[roleId] === 'superadmin' ? list : [
                ...list.filter(item => item.author === username),
                ...list.filter(item => item.region === region && roleObj[item.roleId] === 'editor')
            ])
        })
    }, [roleId, region, username])
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
                    <Button type='link' onClick={() => handleAudit(item, 2, 1)}>通过</Button>
                    <Button type='link' danger onClick={() => handleAudit(item, 3, 0)}>驳回</Button>
                </Space>
            }
        },
    ]
    const handleAudit = (item, auditState, publishState) => {
        setDataSource(dataSource.filter(v => v.id !== item.id))
        axios.patch(`api/news/${item.id}`, {
            auditState,
            publishState
        }).then(res => {
            notification.info({
                message: '通知',
                description: '您可以到【审核管理/审核列表】中查看您的新闻的审核状态',
                placement: 'bottomRight'
            })
        })
    }
    const handlePublish = () => {}
    return (
        <>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey='id' />
        </>
    )
}
