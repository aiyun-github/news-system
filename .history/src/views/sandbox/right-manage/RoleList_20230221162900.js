import { Table } from 'antd'
import React, { useEffect, useState } from 'react'

export default function RoleList() {
    const [dataSource, setDataSource] = useState([])
    const columns = []
    useEffect(() => {
        
    }, [])
    return (
        <>
            <Table dataSource={dataSource} columns={columns}></Table>
        </>
    )
}
