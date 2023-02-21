import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
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
          render: () => {}
        },
        {
          title: '权限名称',
          dataIndex: 'title',
        },
        {
          title: '权限路径',
          dataIndex: 'key',
        },
      ]
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    )
}
