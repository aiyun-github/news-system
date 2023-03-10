import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import NewsPublish from '../../../components/publish-manage/NewsPublish';
import usePublish from '../../../components/publish-manage/usePublish';

// 【发布管理-已下线(3)】
export default function Sunset() {
    const { dataSource, handleDelete } = usePublish(3)
    return (
        <div>
            <NewsPublish
                dataSource={dataSource}
                button={
                    (id) => <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(id)}
                    >
                        删除
                    </Button>
                }
            ></NewsPublish>
        </div>
    )
}
