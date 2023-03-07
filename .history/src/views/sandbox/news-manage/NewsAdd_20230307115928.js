import React from 'react'
import { PageHeader, Steps } from 'antd'

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
