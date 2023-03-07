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
            <Steps current={1}>
                <Step title="Finished" description={description} />
                <Step title="In Progress" description={description} subTitle="Left 00:00:08" />
                <Step title="Waiting" description={description} />
            </Steps>
        </div>
    )
}
