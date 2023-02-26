import { Table, Space, Button, Modal, Tree } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
const { confirm } = Modal

export default function RoleList() {
    const [dataSource, setDataSource] = useState([])
    const [rightList, setRightList] = useState([])
    const [currentRights, setCurrentRights] = useState([])
    const [currentId, setCurrentId] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <b>{id}</b>
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
        },
        {
            title: '操作',
            render: (item) => <Space>
                {/* 气泡卡片 */}
                <Button type='link' icon={<EditOutlined />} onClick={() => {
                    setIsModalOpen(true)
                    setCurrentRights(item.rights)
                    setCurrentId(item.id)
                }}>编辑</Button>
                <Button danger type='link' icon={<DeleteOutlined />} onClick={() => confirmMethod(item)}>删除</Button>
            </Space>
        }
    ]
    useEffect(() => {
        axios.get('/api/roles').then(res => {
            setDataSource(res.data)
        })
    }, [])
    useEffect(() => {
        axios.get('/api/rights?_embed=children').then(res => {
            setRightList(res.data)
        })
    }, [])
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
        setDataSource(dataSource.filter(v => v.id !== item.id))
        axios.delete(`/api/roles/${item.id}`)
    }
    // 配置权限-确定
    const handleOk = () => {
        setIsModalOpen(false)

    }
    // 配置权限-取消
    const handleCancel = () => {
        setIsModalOpen(false)
        setDataSource(dataSource.map(item => {
            if (item.id === currentId) {
                return { ...item, rights: currentRights }
            }
            return item
        }))
        axios.patch(`/api/rights/${currentId}`, { rights: currentRights })
    }
    // 是否勾选
    const onCheck = (checkedKeys) => {
        setCurrentRights(checkedKeys.checked)
    }
    return (
        <>
            <Table dataSource={dataSource} columns={columns} rowKey='id'></Table>
            <Modal title="权限分配" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Tree
                    checkable
                    checkedKeys={currentRights}
                    onCheck={onCheck}
                    checkStrictly={true}
                    treeData={rightList}
                />
            </Modal>
        </>
    )
}
