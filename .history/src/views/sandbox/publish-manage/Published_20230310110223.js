import { Button } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import React from 'react'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'

// 【发布管理-已发布(2)】
export default function Published() {
    const { dataSource } = usePublish(2)
    return (
        <div>
            <NewsPublish
                dataSource={dataSource}
                button={<Button danger icon={<CloudDownloadOutlined />}>下线</Button>}
            ></NewsPublish>
        </div>
    )
}
