import { Row, Col, Card, List } from 'antd'
import React from 'react'

export default function Home() {
    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="用户最常浏览" bordered={true}>
                        <List
                            size='small'
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item>
                                    <Typography.Text mark>[ITEM]</Typography.Text> {item}
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="用户点赞最多" bordered={true}>
                        <List
                            size='small'
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item>
                                    <Typography.Text mark>[ITEM]</Typography.Text> {item}
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Card title" bordered={true}>
                        Card content
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
