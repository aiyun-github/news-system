import React, { useEffect } from 'react'
import axios from 'axios'

export default function AuditList() {
    const { username } = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        getData()
    }, [username])
    const getData = () => {
        // 获取表格列表数据 （_ne表示不等于,_lte表示小于等于）
        axios.get(`/api/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res => {
            setDataSource(res.data)
        })
    }
    return (
        <div>AuditList</div>
    )
}
