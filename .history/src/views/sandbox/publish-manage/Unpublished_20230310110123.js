import { Button } from 'antd';
import { CloudUploadOutlined } from '@ant'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'

// 【发布管理-待发布(1)】
export default function Unpublished() {
    const {dataSource} = usePublish(1)
    return (
        <div>
            <NewsPublish
                dataSource={dataSource}
                button={<Button type='link' icon={<CloudUploadOutlined />}>发布</Button>}
            ></NewsPublish>
        </div>
    )
}
