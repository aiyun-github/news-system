import axios from 'axios'
import React, { useEffect } from 'react'

// 【发布管理-待发布】
export default function Unpublished() {

    useEffect(() => {
        axios.get(`/news/author=%{username}`)
    },[])
    return (
        <div>Unpublished</div>
    )
}
