import React, { useState } from 'react'
import { PageHeader, Steps, Button } from 'antd'
const { Step } = Steps;

export default function NewsAdd() {
   const [current, setCurrent] =  useState(0)
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
            <Button>上一步</Button>
            <Button type="primary">下一步</Button>
        </div>
    )
}
