import { useEffect, useState } from 'react'
import axios from 'axios'

function usePublish() {
    const [dataSource, setDataSource] = useState([])

    const { username } = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        axios.get(`/news/author=${username}&publishState=1&_expand=category`).then(res => {
            setDataSource(res.data)
        })
    },[username])
  return (
    <div>usePublish</div>
  )
}
export default usePublish