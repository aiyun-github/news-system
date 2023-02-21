import React, { useEffect, useState } from 'react'
import { Table, Tag } from 'antd'
import axios from 'axios'

export default function RightList() {
    const [dataSource, setDataSource] = useState()
    useEffect(() => {
        axios.get('/api/rights').then(res => {
            setDataSource(res.data)
        })
    }, [])
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          render: (id) => (<b>{id}</b>)
        },
        {
          title: '权限名称',
          dataIndex: 'title',
        },
        {
          title: '权限路径',
          dataIndex: 'key',
          render: (key) => (<Tag color='orange'>key</Tag>)
        },
      ]
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    )
}
