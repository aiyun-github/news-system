import React from 'react'
import { Button, Descriptions, PageHeader } from 'antd';

export default function NewsPreview() {
    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="Title"
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
