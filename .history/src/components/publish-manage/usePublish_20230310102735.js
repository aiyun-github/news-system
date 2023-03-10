import React, { useEffect, useState } from 'react'
import axios from 'axios'

function usePublish(type) {
    const [dataSource, setDataSource] = useState([])

    const { username } = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        axios.get(`/news/author=${username}&publishState=${type}&_expand=category`).then(res => {
            setDataSource(res.data)
        })
    }, [username, type])
    return {
        dataSource
    }
}
export default usePublish