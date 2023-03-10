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

    const handlePublish = () => {

    }

    const handlePublish = () => {

    }

    const handlePublish = () => {

    }
    return {
        dataSource,
        handlePublish,
        handlePublish,
        handlePublish,
    }
}
export default usePublish