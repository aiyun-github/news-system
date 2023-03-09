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
                    <Descriptions.Item label="发布时间">2017-10-10</Descriptions.Item>
                    <Descriptions.Item label="发布时间">2017-10-10</Descriptions.Item>
                    <Descriptions.Item label="发布时间">2017-10-10</Descriptions.Item>
                    <Descriptions.Item label="发布时间">2017-10-10</Descriptions.Item>
                    <Descriptions.Item label="发布时间">2017-10-10</Descriptions.Item>
        
                </Descriptions>
            </PageHeader>
        </div>
    )
}
