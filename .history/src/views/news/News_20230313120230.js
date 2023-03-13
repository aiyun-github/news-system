import axios from 'axios'
import React, { useEffect } from 'react'
import { PageHeader, Card, Col, Row, List } from 'antd';

export default function News() {
    useEffect(() => {
        axios.get('/api/news?publishState=2&_expand=category').then(res => {

        })
    }, [])
    return (
        <div style={{
            width: '95%',
            margin: '0 auto'
        }}>
            <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="全球新闻"
                subTitle="查看新闻"
            />
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="Card title" bordered={true} hoverable={true}>
                        <List
                            size="small"
                            bordered
                            dataSource={[]}
                            renderItem={item => <List.Item>{item}</List.Item>}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Card title" bordered={true} hoverable={true}>
                        Card content
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Card title" bordered={true} hoverable={true}>
                        Card content
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
