import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'

// 【发布管理-待发布(1)】
export default function Unpublished() {
    const {dataSource} = usePublish(1)
    return (
        <div>
            <NewsPublish
                dataSource={dataSource}
                button={<Button>删除</Button>}
            ></NewsPublish>
        </div>
    )
}
