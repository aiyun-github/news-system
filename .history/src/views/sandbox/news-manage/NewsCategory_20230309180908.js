import React, { useEffect, useState, useContext, useRef } from 'react'
import { Button, Table, Space, Modal, Form } from 'antd'
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