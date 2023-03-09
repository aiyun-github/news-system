import React from 'react'
import { Button, message } from 'antd'
import UploadPrivate from '../../../components/UploadPrivate'
import axios from 'axios'

export default function Home() {
    const submit = (fileList) => {
        const form = new FormData()
        for (const i = 0; i < fileList.length; i++) {
            form.append('files[]', fileList[i])
        }
        axios.post('/file/upload', form).then(res=> {
            if (res.success) {
                message.success('上传成功')
            }
        })
    }
    return (
        <div>Home
            <Button type='primary'>Button</Button>
            <UploadPrivate submit={submit}></UploadPrivate>
        </div>
    )
}
