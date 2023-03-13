import React from 'react'
import { PageHeader } from 'antd';

export default function Detail() {
  return (
    <div>
        <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="全球新闻"
                subTitle="查看新闻"
            />
    </div>
  )
}
