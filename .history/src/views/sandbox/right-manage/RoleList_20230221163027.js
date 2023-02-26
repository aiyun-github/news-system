import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function RoleList() {
    const [dataSource, setDataSource] = useState([])
    const columns = []
    useEffect(() => {
        axios.get('/api/roles').then(res => {
            setDataSource(res.data)
        })
    }, [])
    return (
        <>
            <Table dataSource={dataSource} columns={columns}></Table>
        </>
    )
}
