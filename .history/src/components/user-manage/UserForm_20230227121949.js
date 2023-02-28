import React from 'react'
import { Form, Input, Select } from 'antd'
import { Option } from 'Select'

const UserForm = (props) => {
    return (
        <Form
            layout="vertical"
        >
            <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: 'Please input the username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[{ required: true, message: 'Please input the password!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="region"
                label="区域"
                rules={[{ required: true, message: 'Please input the password!' }]}
            >
                <Select>
                    {
                        props.regionList.map(item => {
                            return <Option key={item.id} value={item.value}>{item.title}</Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name="roleId"
                label="角色"
                rules={[{ required: true, message: 'Please input the role!' }]}
            >
                <Select>
                    {
                        props.roleList.map(item => {
                            return <Option key={item.id} value={item.id}>{item.roleName}</Option>
                        })
                    }
                </Select>
            </Form.Item>
        </Form>
    )
}

export default 
