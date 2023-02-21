import React from 'react'
import { Table } from 'antd'

export default function RightList() {
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
