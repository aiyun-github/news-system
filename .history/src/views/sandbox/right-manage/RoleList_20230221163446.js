import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function RoleList() {
    const [dataSource, setDataSource] = useState([])
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <b>{id}</b>
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
        },
        {
            title: '操作',
            render: () => {
                
            },
        },
    ]
    useEffect(() => {
        axios.get('/api/roles').then(res => {
            setDataSource(res.data)
        })
    }, [])
    return (
        <>
            <Table dataSource={dataSource} columns={columns} rowKey='id'></Table>
        </>
    )
}
