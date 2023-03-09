import React from 'react'
import { Button } from 'antd'
import UploadPrivate from '../../../components/UploadPrivate'

export default function Home() {
    return (
        <div>Home
            <Button type='primary'>Button</Button>
            <UploadPrivate></UploadPrivate>
        </div>
    )
}
