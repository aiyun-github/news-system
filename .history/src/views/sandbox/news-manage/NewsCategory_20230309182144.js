import React, { useEffect, useState, useContext, useRef } from 'react'
import { Button, Table, Space, Modal, Form, Input } from 'antd'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
const { confirm } = Modal

//【新闻管理-新闻分类】
export default function NewsCategory(props) {
    // 存储表格列表数据
    const [dataSource, setDataSource] = useState()

    useEffect(() => {
        axios.get('/api/categories').then(res => {
            setDataSource(res.data)
        })
    }, [])

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    // 表格列
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <b>{id}</b>
        },
        {
            title: '栏目名称',
            dataIndex: 'title',
            onCell: (record) => ({
                record,
                editable: true,
                dataIndex: title,
                title: '栏目名称',
                handleSave,
            }),
        },
        {
            title: '操作',
            render: (item) => {
                return <Space>
                    <Button danger type='link' icon={<DeleteOutlined />} onClick={() => confirmMethod(item)}>删除</Button>
                </Space>
            }
        },
    ]
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
        axios.delete(`/api/categories/${item.id}`)
    }
    // 保存
    const handleSave = (record) => {
        // 此处接口使用的json-server，所以这里分2步，真实开发中更改后直接在请求一次列表就行
        // 更改前台显示
        setDataSource(dataSource.map(item => {
            if (item.id === record.id) {
                return {
                    // id: item.id,
                    title: record.title,
                    value: record.title
                }
            }
            return item
        }))
        // 更改后台数据
        axios.patch(`categories/${record.id}`, {
            title: record.title,
            value: record.title
        })
    }

    const EditableContext = React.createContext(null);

    const EditableRow = ({ index, ...props }) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };
    const EditableCell = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
    }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef(null);
        const form = useContext(EditableContext);
        useEffect(() => {
            if (editing) {
                inputRef.current.focus();
            }
        }, [editing]);
        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({
                [dataIndex]: record[dataIndex],
            });
        };
        const save = async () => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handleSave({
                    ...record,
                    ...values,
                });
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };
        let childNode = children;
        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
            ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
        }
        return <td {...restProps}>{childNode}</td>;
    };
    return (
        <>
            <Table
                components={components}
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 5 }}
                rowKey='id'
            />
        </>
    )
}