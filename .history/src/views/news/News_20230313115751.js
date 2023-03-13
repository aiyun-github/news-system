import axios from 'axios'
import React, { useEffect } from 'react'
import { PageHeader } from 'antd';

export default function News() {
    useEffect(() => {
        axios.get('/api/news?publishState=2&_expand=category').then(res => {

        })
    }, [])
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
