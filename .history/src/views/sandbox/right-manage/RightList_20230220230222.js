import React from 'react'
import { Table } from 'antd'

export default function RightList() {
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    )
}
