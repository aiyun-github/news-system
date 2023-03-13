import { Row, Col, Card, List, Avatar, Drawer } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import * as echarts from 'echarts'
import _ from 'lodash'
const { Meta } = Card;

export default function Home() {
    const [viewList, setViewList] = useState([])
    const [starList, setStarList] = useState([])
    const [open, setOpen] = useState(false)
    const barRef = useRef(null)
    const pieRef = useRef(null)

    // 获取用户最常浏览数据
    useEffect(() => {
        axios.get('/api/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6').then(res => {
            setViewList(res.data)
        })
    }, [])

    // 获取用户点赞最多数据
    useEffect(() => {
        axios.get('/api/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6').then(res => {
            setStarList(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get('/api/news?publishState=2&_expand=category').then(res => {
            renderBarView(_.groupBy(res.data, item => item.category.title))
        })
        // 清除事件
        return () => {
            window.onresize = null
        }
    }, [])

    // 新闻分类柱状图
    const renderBarView = (obj) => {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(barRef.current);

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '新闻分类图示'
            },
            tooltip: {},
            legend: {
                data: ['数量']
            },
            xAxis: {
                data: Object.keys(obj),
                axisLabel: {
                    rotate: '45',
                    interval: 0,
                }
            },
            yAxis: {
                minInterval: 1,
            },
            series: [
                {
                    name: '数量',
                    type: 'bar',
                    data: Object.values(obj).map(item => item.length)
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        // 设置柱状图随窗口大小自适应
        window.onresize = () => {
            myChart.resize()
        }
    }

    // 个人新闻分类饼状图
    const renderPieView = (obj) => {
        var myChart = echarts.init(pieRef.current);
        var option;

        option = {
            title: {
                text: 'Referer of a Website',
                subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        option && myChart.setOption(option);
    }

    const { username, region, role: { roleName } } = JSON.parse(localStorage.getItem('token'))

    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="用户最常浏览" bordered={true}>
                        <List
                            size='small'
                            dataSource={viewList}
                            renderItem={(item) => <List.Item>
                                <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
                            </List.Item>}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="用户点赞最多" bordered={true}>
                        <List
                            size='small'
                            dataSource={starList}
                            renderItem={(item) => <List.Item>
                                <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
                            </List.Item>}
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
                            <SettingOutlined
                                key="setting"
                                onClick={() => {
                                    setTimeout(() => {
                                        setOpen(true)
                                        // init初始化
                                        renderPieView()
                                    }, 0)
                                }}
                            />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={username}
                            description={
                                <div>
                                    <b>{region ? region : '全球'}</b>
                                    <span style={{ paddingLeft: '30px' }}>{roleName}</span>
                                </div>
                            }
                        />
                    </Card>
                </Col>
            </Row>
            {/* 个人新闻分类侧边栏 */}
            <Drawer
                width='500px'
                title="个人新闻分类"
                placement="right" onClose={() => setOpen(false)}
                open={open}
            >
                <div ref={pieRef} style={{
                    width: '600px',
                    height: '400px',
                }}></div>
            </Drawer>
            {/* 新闻分类图示 */}
            <div ref={barRef} style={{
                width: '600px',
                height: '400px',
            }}></div>
        </div>
    )
}
