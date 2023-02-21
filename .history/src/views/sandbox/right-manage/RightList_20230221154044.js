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
        if(item.grade === 1) { // 一级菜单
            axios.delete(`/api/right/${item.id}`)
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