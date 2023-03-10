import { notification } from 'antd'
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
        axios.patch(`/api/news/${id}`, {
            publishState: 2,
            publishTime: Date.now()
        }).then(res => {
            // 通知框
            notification.info({
                message: `通知`,
                description:
                  `您可以到【发布管理/已发布】中查看您的新闻`,
                placement: 'bottomRight',
              });
        })
    }

    // 下线
    const handleSunset = (id) => {
        setDataSource(dataSource.filter(item => item.id !== id))
        axios.patch(`/api/news/${id}`, {
            publishState: 3,
        }).then(res => {
            // 通知框
            notification.info({
                message: `通知`,
                description:
                  `您可以到【发布管理/已下线】中查看您的新闻`,
                placement: 'bottomRight',
              });
        })
    }

    // 删除
    const handleDelete = (id) => {
        setDataSource(dataSource.filter(item => item.id !== id))
        axios.delete(`/api/news/${id}`).then(res => {
            // 通知框
            notification.info({
                message: `通知`,
                description:
                  `您已经删除了已下线的新闻`,
                placement: 'bottomRight',
              });
        })
    }
    return {
        dataSource,
        handlePublish,
        handleSunset,
        handleDelete,
    }
}
export default usePublish