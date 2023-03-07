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
        </div>
    )
}
