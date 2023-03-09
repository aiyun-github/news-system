import React, { useEffect, useState } from 'react'
import { Button, Table, Space, Modal } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
const { confirm } = Modal

// 草稿箱列表页
export default function NewsDraft() {
    // 存储表格列表数据
    const [dataSource, setDataSource] = useState()

    const { username } = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        // 获取表格列表数据
        axios.get(`/api/news?author=${username}&auditState=0&_expand=category`).then(res => {
            // 如果children是[]则去掉（或改为字符串），方法一
            // const tableData = res.data.map(item => ({ ...item, children: item.children?.length && item.children }))
            const tableData = res.data
            // 如果children是[]则（去掉或）改为字符串，方法二
            tableData.forEach(element => {
                if (!element.children.length) {
                    element.children = ''
                }
            });
            setDataSource(tableData)
        })
    }, [username])
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
                    <Button danger type='link' icon={<DeleteOutlined />} onClick={() => confirmMethod(item)}>审核</Button>
                    <Button danger type='link' icon={<DeleteOutlined />} onClick={() => confirmMethod(item)}>发布</Button>
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
        if (item.grade === 1) { // 一级菜单
            axios.delete(`/api/rights/${item.id}`)
        } else { // 二级菜单
            axios.delete(`/api/children/${item.id}`)
        }
    }
    return (
        <>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />;
        </>
    )
}