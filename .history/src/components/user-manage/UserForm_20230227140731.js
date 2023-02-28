import React, { forwardRef, useState } from 'react'
import { Form, Input, Select } from 'antd'
const { Option } = Select

const UserForm = forwardRef((props, ref) => {
   const [isDisabled, setIsDisabled] = useState(false)
    return (
        <Form
             ref={ref}
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
                <Select disabled={isDisabled }>
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
                <Select onChange={(value) => value === 1 ? setIsDisabled(true) : setIsDisabled(false)}>
                    {
                        props.roleList.map(item => {
                            return <Option key={item.id} value={item.id}>{item.roleName}</Option>
                        })
                    }
                </Select>
            </Form.Item>
        </Form>
    )
})

export default UserForm
