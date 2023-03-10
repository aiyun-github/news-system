import { Form, Input, Select } from 'antd'
import React, { forwardRef, useEffect, useState } from 'react'
const { Option } = Select

const UserForm = forwardRef((props, ref) => {
    const [isDisabled, setIsDisabled] = useState(false)
    useEffect(() => {
        setIsDisabled(props.isUpdateDisabled)
    }, [props.isUpdateDisabled])

    const { roleId, region, username } = JSON.parse(localStorage.getItem('token'))
    const roleObj = {
        '1': 'superadmin',
        '2': 'admin',
        '3': 'editor',
    }
    // 根据权限禁用不可选区域
    const checkRegionDisabled = (item) => {
        if (props.isUpdate) {
            if (roleObj[roleId] === 'superadmin') {
                return false
            } else {
                return true
            }
        } else {
            if (roleObj[roleId] === 'superadmin') {
                return false
            } else {
                return item.value !== region
            }
        }
    }
    // 根据权限禁用不可选角色
    const checkRoleDisabled = (item) => {
        if (props.isUpdate) {
            if (roleObj[roleId] === 'superadmin') {
                return false
            } else {
                return true
            }
        } else {
            if (roleObj[roleId] === 'superadmin') {
                return false 
            } else {
                return roleObj[item.id] !== 'editor'
            }
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
                <Select disabled={isDisabled}>
                    {
                        props.regionList.map(item => {
                            return <Option key={item.id}
                                disabled={checkRegionDisabled(item)}
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
                            return <Option key={item.id}
                            disabled={checkRoleDisabled()}
                            value={item.id}>{item.roleName}</Option>
                        })
                    }
                </Select>
            </Form.Item>
        </Form>
    )
})

export default UserForm
