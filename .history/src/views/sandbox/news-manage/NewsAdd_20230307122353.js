import React, { useState } from 'react'
import { PageHeader, Steps, Button } from 'antd'
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
            <PageHeader
                className="site-page-header"
                title="撰写新闻"
                subTitle="This is a subtitle"
            />
            <Steps current={current}>
                <Step title="基本信息" description="新闻标题，新闻分类" />
                <Step title="新闻内容" description="新闻主体内容" subTitle="Left 00:00:08" />
                <Step title="新闻提交" description="保存草稿或者提交审核" />
            </Steps>
            <div style={{marginTop: '50px'}}>
                {
                    current === 2 && <span>
                        <Button type="primary">保存草稿箱</Button>
                        <Button danger>提交审核</Button>
                    </span>
                }
                {
                    current < 2 && <Button type="primary" onClick={handleNext}>下一步</Button>
                }
                {
                    current > 0 && <Button onClick={handlePrevious}>上一步</Button>
                }
            </div>
        </div>
    )
}
