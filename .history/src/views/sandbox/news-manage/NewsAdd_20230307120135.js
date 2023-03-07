import React from 'react'
import { PageHeader, Steps } from 'antd'
const { Step } = Steps;

export default function NewsAdd() {
    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="Title"
                subTitle="This is a subtitle"
            />
            <Steps current={0}>
                <Step title="基本信息" description="新闻标题，新闻分类" />
                <Step title="新闻内容" description="新闻主体内容" subTitle="Left 00:00:08" />
                <Step title="Waiting" description={description} />
            </Steps>
        </div>
    )
}
