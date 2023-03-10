import { CloudUploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import NewsPublish from '../../../components/publish-manage/NewsPublish';
import usePublish from '../../../components/publish-manage/usePublish';

// 【发布管理-待发布(1)】
export default function Unpublished() {
    const { dataSource, handlePublish } = usePublish(1)
    return (
        <div>
            <NewsPublish
                dataSource={dataSource}
                button={
                    (id) => <Button
                        type='link'
                        icon={<CloudUploadOutlined />}
                        onClick={() => handlePublish(id)}
                    >
                        发布
                    </Button>
                }
            ></NewsPublish>
        </div>
    )
}
