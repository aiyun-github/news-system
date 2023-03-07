import React, { useEffect, useRef, useState } from 'react'
import { PageHeader, Steps, Button, Space, Form, Input, Select, message } from 'antd'
import style from './News.module.css'
import axios from 'axios';
import NewsEditor from '../../../components/news-manage/NewsEditor';
const { Step } = Steps;
const { Option } = Select;

export default function NewsAdd(props) {
    const [current, setCurrent] = useState(0) // 当前步骤
    const [categoryList, setCategoryList] = useState([]) // 新闻分类list
    const [formInfo, setFormInfo] = useState({}) // 表单内容
    const [content, setContent] = useState('') // 富文本内容
    const User = JSON.parse(localStorage.getItem('token')) // 登录的用户信息

    // 下一步
    const handleNext = () => {
        if (current === 0) {
            // 第一步输入校验
            NewsForm.current.validateFields().then(res => {
                setFormInfo(res)
                setCurrent(current + 1)
            }).catch(error => {
                console.log(error)
            })
        } else {
            // 第二步富文本框校验
            if(content === '' || content.trim() === '<p></p>') {
                message.error('新闻内容不能为空')
            } else {
                setCurrent(current + 1)
            }
        }
    }

    // 上一步
    const handlePrevious = () => {
        setCurrent(current - 1)
    }

    // 创建表单ref
    const NewsForm = useRef(null)

    // 获取新闻分类
    useEffect(() => {
        axios.get('/api/categories').then(res => {
            setCategoryList(res.data)
        })
    }, [])

    // 保存草稿箱|提交审核
    const handleSave = (auditState) => {
        axios.post('/news', {
            ...formInfo,
            content,
            region: User.region ? User.region : '全球',
            author: User.username,
            roleId: User.roleId,
            auditState,
            publishState: 0,
            createTime: Date.now(),
            star: 0,
            view: 0,
            // publishTime: 0,
        }).then(res => {
            props.history.push()
        })
    }
    return (
        <div>
            {/* 页面标题 */}
            <PageHeader
                className="site-page-header"
                title="撰写新闻"
                subTitle="This is a subtitle"
            />
            {/* 步骤条 */}
            <Steps current={current}>
                <Step title="基本信息" description="新闻标题，新闻分类" />
                <Step title="新闻内容" description="新闻主体内容" subTitle="Left 00:00:08" />
                <Step title="新闻提交" description="保存草稿或者提交审核" />
            </Steps>
            {/* 第一步：基础信息表单 */}
            <div style={{ marginTop: '50px' }} className={current === 0 ? '' : style.active}>
                <Form
                    name="basic"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 21 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    ref={NewsForm}
                >
                    <Form.Item
                        label="新闻标题"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your title!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="新闻分类"
                        name="categoryId"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your category!',
                            },
                        ]}
                    >
                        <Select>
                            {
                                categoryList.map(item =>
                                    <Option value={item.id} key={item.id}>{item.title}</Option>
                                )
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </div>
            {/* 第二步：新闻编辑（富文本编辑） */}
            <div className={current === 1 ? '' : style.active}>
                <NewsEditor getContent={(value) => {
                    setContent(value)
                }}></NewsEditor>
            </div>
            <div className={current === 2 ? '' : style.active}>

            </div>
            {/* 操作按钮 */}
            <Space style={{ marginTop: '50px' }}>
                {
                    current === 2 && <Space>
                        <Button type="primary" onClick={() => handleSave(0)}>保存草稿箱</Button>
                        <Button danger onClick={() => handleSave(1)}>提交审核</Button>
                    </Space>
                }
                {
                    current < 2 && <Button type="primary" onClick={handleNext}>下一步</Button>
                }
                {
                    current > 0 && <Button onClick={handlePrevious}>上一步</Button>
                }
            </Space>
        </div>
    )
}
