
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'

// 【发布管理-待发布】
export default function Unpublished() {
    const {dataSource} = usePublish()
    return (
        <div>
            <NewsPublish dataSource={dataSource}></NewsPublish>
        </div>
    )
}
