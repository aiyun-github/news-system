import { Row, Col, Card, List, Avatar } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'

export default function Home() {
    const useState([])
    useEffect(() => {

    }, [])
    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="用户最常浏览" bordered={true}>
                        <List
                            size='small'
                            dataSource={['11']}
                            renderItem={(item) => (
                                <List.Item>
                                    111
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="用户点赞最多" bordered={true}>
                        <List
                            size='small'
                            dataSource={['11']}
                            renderItem={(item) => (
                                <List.Item>
                                    222
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                        actions={[
                            <SettingOutlined key="setting" />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
