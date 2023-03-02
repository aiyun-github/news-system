import React, { useEffect, useState, useRef } from 'react'
import { Button, Table, Space, Switch, Modal } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
import UserForm from '../../../components/user-manage/UserForm';
const { confirm } = Modal

// 权限列表页
export default function UserList() {
    // 存储表格列表数据
    const [dataSource, setDataSource] = useState()
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [roleList, setRoleList] = useState([])
    const [regionList, setRegionList] = useState([])
    const [current, setCurrent] = useState(null)
    const [isUpdateDisabled, setIsUpdateDisabled] = useState(false)
    const addForm = useRef(null)
    const updateForm = useRef(null)

    const { roleId, region, username } = JSON.parse(localStorage.getItem('token'))
    const roleObj = {
        '1': 'superadmin',
        '2': 'admin',
        '3': 'editor',
    }
    useEffect(() => {
        axios.get('/api/users?_expand=role').then(res => {
            const list = res.data
            setDataSource(roleObj[roleId] === 'superadmin' ? list : [
                ...list.filter(item => item.username === username),
                ...list.filter(item => item.region === region && roleObj[item.roleId] === 'editor')
            ])
        })
    }, [roleId, region, username])
    useEffect(() => {
        getRoleList()
        getRegionList()
    },[])
    // 获取表格列表数据 
    const getData = () => {
        axios.get('/api/users?_expand=role').then(res => {
            const list = res.data
            setDataSource(roleObj[roleId] === 'superadmin' ? list : [
                ...list.filter(item => item.username === username),
                ...list.filter(item => item.region === region && roleObj[item.roleId] === 'editor')
            ])
        })
    }
    // 获取角色
    const getRoleList = () => {
        axios.get('/api/roles').then(res => {
            setRoleList(res.data)
        })
    }
    // 获取区域
    const getRegionList = () => {
        axios.get('/api/regions').then(res => {
            setRegionList(res.data)
        })
    }
    // 表格列
    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            filters: [
                ...regionList.map(item => ({
                    text: item.title,
                    value: item.value,
                })),
                {
                    text: '全球',
                    value: '全球',
                }
              ],
            onFilter: (value, item) => value === '全球' ? item.region === '' : item.region === value,
            render: (region) => <b>{region ? region : '全球'}</b>
        },
        {
            title: '角色名称',
            dataIndex: 'role',
            render: (role) => role?.roleName
        },
        {
            title: '用户名',
            dataIndex: 'username'
        },
        {
            title: '用户状态',
            dataIndex: 'roleState',
            render: (roleState, item) => <Switch checked={roleState} disabled={item.default} onChange={() => handleChange(item)}></Switch>
        },
        {
            title: '操作',
            render: (item) => {
                return <Space>
                    <Button disabled={item.default} type='link' icon={<EditOutlined />} onClick={() => handleUpdate(item)}>编辑</Button>
                    <Button disabled={item.default} danger type='link' icon={<DeleteOutlined />} onClick={() => confirmMethod(item)}>删除</Button>
                </Space>
            }
        },
    ]
    // 切换用户状态
    const handleChange = (item) => {
        axios.patch(`/api/users/${item.id}`, {roleState: !item.roleState}).then(res => {
            getData()
        })
    }
    const handleUpdate = async (item) => {
        // react状态更新是异步的，这里要改成同步的
        // 方法一：
        // setTimeout( ()=> {
        //     setIsUpdateOpen(true)
        //     updateForm.current.setFieldsValue(item)
        // }, 0)
        // 方法二：
        await setIsUpdateOpen(true)
        if (item.roleId === 1) {
            setIsUpdateDisabled(true)
        } else {
            setIsUpdateDisabled(false)
        }
        updateForm.current.setFieldsValue(item)
        setCurrent(item)

    }
    // 修改
    const updateFormOk = () => {
        setIsUpdateOpen(false)
        updateForm.current.validateFields().then(value => {
            setIsAddOpen(false)
            axios.patch(`/api/users/${current.id}`, {
                ...value
            }).then(res => {
                getData()
            })
        }).catch(err => {
            console.log(err, 'err')
        })
    }
    // 删除提示
    const confirmMethod = (item) => {
        confirm({
            title: '删除',
            icon: <ExclamationCircleOutlined />,
            content: '你确定删除吗？',
            onOk() {
                deleteMethod(item)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    // 删除方法
    const deleteMethod = (item) => {
        axios.delete(`/api/users/${item.id}`).then(res => {
            getData()
        })
    }
    // 新增
    const addFormOk = () => {
        addForm.current.validateFields().then(value => {
            setIsAddOpen(false)
            axios.post('/api/users', {
                ...value,
                roleState: true,
                default: false
            }).then(res => {
                getData()
            })
        }).catch(err => {
            console.log(err, 'err')
        })
    }
    return (
        <>
            <Button type='primary' onClick={() => setIsAddOpen(true)}>添加</Button>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey='id' />
            <Modal
                open={isAddOpen}
                title="添加用户"
                okText="确定"
                cancelText="取消"
                onCancel={() => setIsAddOpen(false)}
                onOk={() => addFormOk()}
            >
               <UserForm roleList={roleList} regionList={regionList} ref={addForm}></UserForm>
            </Modal>
            <Modal
                open={isUpdateOpen}
                title="更新用户"
                okText="更新"
                cancelText="取消"
                onCancel={() => {
                    setIsUpdateOpen(false)
                    setIsUpdateDisabled(false)
                }}
                onOk={() => updateFormOk()}
            >
               <UserForm roleList={roleList} regionList={regionList} ref={updateForm} isUpdateDisabled={isUpdateDisabled}></UserForm>
            </Modal>
        </>
    )
}