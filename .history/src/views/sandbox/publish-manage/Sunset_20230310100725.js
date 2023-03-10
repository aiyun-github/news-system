import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NewsPublish from '../../../components/publish-manage/NewsPublish'

// 【发布管理-下线】
export default function Sunset() {
    const [dataSource, setDataSource] = useState([])

    const { username } = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        axios.get(`/news/author=${username}&publishState=2&_expand=category`).then(res => {
            setDataSource(res.data)
        })
    },[username])
    return (
        <div>
            <NewsPublish dataSource={dataSource}></NewsPublish>
        </div>
    )
}
