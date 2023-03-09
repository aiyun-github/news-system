import React, { useEffect, useState } from 'react'
import { Button, Descriptions, PageHeader } from 'antd';
import axios from 'axios';

export default function NewsPreview(props) {
    const [newsInfo, setNewsInfo] = useState(null)

    useEffect(() => {
        axios.get(`/api/news/${props.match.params.id}?_expand=category&_expand=role`).then(res => {
            setNewsInfo(res.data)
        })
    })
    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={newsInfo?.title}
                subTitle="This is a subtitle"
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="创建者">Lili Qu</Descriptions.Item>
                    <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
                    <Descriptions.Item label="发布时间">2017-10-10</Descriptions.Item>
                    <Descriptions.Item label="区域">2017-10-10</Descriptions.Item>
                    <Descriptions.Item label="审核状态">2017-10-10</Descriptions.Item>
                    <Descriptions.Item label="发布状态">2017-10-10</Descriptions.Item>
                    <Descriptions.Item label="访问数量">2017-10-10</Descriptions.Item>
                    <Descriptions.Item label="点赞数量">2017-10-10</Descriptions.Item>
                    <Descriptions.Item label="评论数量">2017-10-10</Descriptions.Item>
                </Descriptions>
            </PageHeader>
        </div>
    )
}
