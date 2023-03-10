import axios from 'axios'
import React, { useEffect } from 'react'

// 【发布管理-待发布】
export default function Unpublished() {

    const { username } = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        axios.get(`/news/author=${username}&publishState=1&_expand=category`).then(res => {

        })
    },[username])
    return (
        <div>
            <NewsPublish></NewsPublish>
        </div>
    )
}
