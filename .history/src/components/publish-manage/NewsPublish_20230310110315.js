import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Table } from 'antd';
import axios from 'axios';
import React from 'react';
const { confirm } = Modal

// 权限列表页
export default function RightList(props) {
    // 表格列
    const columns = [
        {
            title: '新闻标题',
            dataIndex: 'title',
            render: (title, item) => <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
        },
        {
            title: '作者',
            dataIndex: 'author',
        },
        {
            title: '新闻分类',
            dataIndex: 'category',
            render: (category) => <span>{category.title}</span>
        },
        {
            title: '操作',
            render: (item) => {
                return <Space>
                    {props.button}
                </Space>
            }
        },
    ]
    return (
        <>
            <Table dataSource={props.dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey='id'/>;
        </>
    )
}