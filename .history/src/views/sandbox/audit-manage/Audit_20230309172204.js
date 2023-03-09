import axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function Audit() {
    const [dataSource, setDataSource] = useState([])
    const { roleId, region, username } = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        const roleObj = {
            '1': 'superadmin',
            '2': 'admin',
            '3': 'editor'
        }
        axios.get(`/news?auditState=1&_expand=category`).then(res => {
            const list = res.data
            setDataSource(roleObj[roleId] === 'superadmin' ? list : [
                ...list.filter(item => item.username === username),
                ...list.filter(item => item.region === region && roleObj[item.roleId] === 'editor')
            ])
        })
    }, [roleId, region, username])
    return (
        <>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey='id' />
        </>
    )
}
