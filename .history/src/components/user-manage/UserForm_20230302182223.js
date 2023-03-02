import React, { forwardRef, useState, useEffect } from 'react'
import { Form, Input, Select } from 'antd'
const { Option } = Select

const UserForm = forwardRef((props, ref) => {
   const [isDisabled, setIsDisabled] = useState(false)
   useEffect(() => {
     setIsDisabled(props.isUpdateDisabled)
   }, [props.isUpdateDisabled])
   
   const checkRegionDisabled = () => {
        if () {

        } else {

        }
        if () {

        } else {
            
        }
   }
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
                rules={isDisabled ? [] : [{ required: true, message: 'Please input the region!' }]}
            >
                <Select disabled={isDisabled }>
                    {
                        props.regionList.map(item => {
                            return <Option key={item.id}
                            disabled={checkRegionDisabled()}
                            value={item.value}>{item.title}</Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name="roleId"
                label="角色"
                rules={[{ required: true, message: 'Please input the role!' }]}
            >
                <Select onChange={(value) => {
                    if (value === 1) {
                        setIsDisabled(true)
                        ref.current.setFieldsValue({ region: '' })
                    } else {
                        setIsDisabled(false)
                    }
                }}>
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
