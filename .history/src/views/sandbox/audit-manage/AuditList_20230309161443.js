import React from 'react'

export default function AuditList() {
    useEffect(() => {
        getData()
    }, [username])
    const getData = () => {
        // 获取表格列表数据
        axios.get(`/api/news?author=${username}&auditState=0&_expand=category`).then(res => {
            setDataSource(res.data)
        })
    }
  return (
    <div>AuditList</div>
  )
}
