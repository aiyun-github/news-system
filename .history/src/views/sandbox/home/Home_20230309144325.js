import React from 'react'
import { Button } from 'antd'
import UploadPrivate from '../../../components/UploadPrivate'

export default function Home() {
    const submit = (fileList) => {
        console.log(fileList, 'fileList')
    }
    return (
        <div>Home
            <Button type='primary'>Button</Button>
            <UploadPrivate submit={submit}></UploadPrivate>
        </div>
    )
}
