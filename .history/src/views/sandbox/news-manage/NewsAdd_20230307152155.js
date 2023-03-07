import React, { useState } from 'react'
import { PageHeader, Steps, Button, Space, Form, Input } from 'antd'
import style from './News.module.css'
const { Step } = Steps;

export default function NewsAdd() {
    const [current, setCurrent] = useState(0)
    const handleNext = () => {
        setCurrent(current + 1)
    }
    const handlePrevious = () => {
        setCurrent(current - 1)
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
            <div className={current ? '' : style.active}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </div>
            <div className={current === 1 ? '' : style.active}>

            </div>
            <div className={current === 2 ? '' : style.active}>

            </div>
            {/* 操作按钮 */}
            <Space style={{ marginTop: '50px' }}>
                {
                    current === 2 && <Space>
                        <Button type="primary">保存草稿箱</Button>
                        <Button danger>提交审核</Button>
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
