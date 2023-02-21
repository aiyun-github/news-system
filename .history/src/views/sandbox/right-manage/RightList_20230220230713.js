import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import axios from 'axios'

export default function RightList() {
    const [dataSource, setDataSource] = useState()
    useEffect(() => {
        axios.get('/api/rights/')
    }, [])
    const columns = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
        },
      ]
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    )
}
