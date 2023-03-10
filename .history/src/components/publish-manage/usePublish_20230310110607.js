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
    const handlePublish = () => {

    }

    // 下线
    const handleSunset = () => {

    }

    // 删除
    const handleDelete = () => {

    }
    return {
        dataSource,
        handlePublish,
        handleSunset,
        handleDelete,
    }
}
export default usePublish