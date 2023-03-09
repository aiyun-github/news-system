import React, { useEffect, useState } from 'react'
import { Button, Descriptions, PageHeader } from 'antd';
import axios from 'axios';

export default function NewsPreview(props) {
    const [newsInfo, setNewsInfo] = useState(null)

    useEffect(() => {
        axios.get(`/api/news/${props.match.params.id}?_expand=category&_expand=role`).then(res => {
            setNewsInfo(res.data)
        }, [])
    })
    return (
        <div>
            {
                newsInfo &&
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title={newsInfo.title}
                    subTitle={newsInfo.category.title}
                >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
                        <Descriptions.Item label="创建时间">{moment(newsInfo.createTime).format('YYYY/MM/DD HH:mm:ss')}</Descriptions.Item>
                        <Descriptions.Item label="发布时间">{moment(newsInfo.createTime).format('YYYY/MM/DD')}</Descriptions.Item>
                        <Descriptions.Item label="区域">{newsInfo.}</Descriptions.Item>
                        <Descriptions.Item label="审核状态">{newsInfo.}</Descriptions.Item>/Descriptions.Item>
                        <Descriptions.Item label="发布状态">{newsInfo.}</Descriptions.Item>
                        <Descriptions.Item label="访问数量">{newsInfo.}</Descriptions.Item>
                        <Descriptions.Item label="点赞数量">{newsInfo.}</Descriptions.Item>
                        <Descriptions.Item label="评论数量">{newsInfo.}</Descriptions.Item>
                    </Descriptions>
                </PageHeader>
            }
        </div>
    )
}
