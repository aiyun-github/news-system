import axios from 'axios'
import { useEffect, useState } from 'react'

function usePublish(type) {
    const [dataSource, setDataSource] = useState([])

    const { username } = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        axios.get(`/api/news?author=${username}&publishState=${type}&_expand=category`).then(res => {
            setDataSource(res.data)
        })
    }, [type, username])

    // 发布
    const handlePublish = (id) => {
        setDataSource(dataSource.filter(item => item.id !== id))
        
    }

    // 下线
    const handleSunset = (id) => {
        setDataSource(dataSource.filter(item => item.id !== id))
    }

    // 删除
    const handleDelete = (id) => {
        setDataSource(dataSource.filter(item => item.id !== id))
    }
    return {
        dataSource,
        handlePublish,
        handleSunset,
        handleDelete,
    }
}
export default usePublish