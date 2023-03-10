import { CloudDownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import NewsPublish from '../../../components/publish-manage/NewsPublish';
import usePublish from '../../../components/publish-manage/usePublish';

// 【发布管理-已发布(2)】
export default function Published() {
    const { dataSource, handleSunset } = usePublish(2)
    return (
        <div>
            <NewsPublish
                dataSource={dataSource}
                button={
                    (id) => <Button
                        danger
                        icon={<CloudDownloadOutlined />}
                        onClick={() => handleSunset(id)}
                    >
                        下线
                    </Button>
                }
            ></NewsPublish>
        </div>
    )
}
