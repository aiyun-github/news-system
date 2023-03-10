import axios from 'axios'
import React from 'react'
import NewsPublish from '../../../components/publish-manage/NewsPublish'

// 【发布管理-下线】
export default function Sunset() {
    const {dataSource} = usePublish()
    return (
        <div>
            <NewsPublish dataSource={dataSource}></NewsPublish>
        </div>
    )
}
