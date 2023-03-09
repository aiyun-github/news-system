import React from 'react'
import { Button } from 'antd'
import UploadPrivate from '../../../components/UploadPrivate'
import axios from 'axios'

export default function Home() {
    const submit = (fileList) => {
        console.log(fileList, 'fileList')
        const form = new FormData()
        for (const item of fileList) {
            form.append('file', item)
        }
        // axios.post('https://www.mocky.io/v2/5cc8019d300000980a055e76')
    }
    return (
        <div>Home
            <Button type='primary'>Button</Button>
            <UploadPrivate submit={submit}></UploadPrivate>
        </div>
    )
}
