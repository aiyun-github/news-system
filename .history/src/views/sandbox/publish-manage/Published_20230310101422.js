import React from 'react'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'

// 【发布管理-已发布】
export default function Published() {
    const {dataSource} = usePublish(2)
    return (
        <div>
            <NewsPublish dataSource={dataSource}></NewsPublish>
        </div>
    )
}
