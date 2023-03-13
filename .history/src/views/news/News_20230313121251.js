import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PageHeader, Card, Col, Row, List } from 'antd';
import _ from 'lodash'

export default function News() {
    const [list, setList] = useState([])
    useEffect(() => {
        axios.get('/api/news?publishState=2&_expand=category').then(res => {
            setList(Object.entries(_.groupBy(res.data, item => item.category.title)))
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
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card title="Card title" bordered={true} hoverable={true}>
                        <List
                            size="small"
                            bordered
                            dataSource={[]}
                            pagination={{
                                pageSize: 3,
                            }}
                            renderItem={item => <List.Item>{item}</List.Item>}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
