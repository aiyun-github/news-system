import React from 'react'

export default function AuditList() {
    const { username } = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        getData()
    }, [username])
    const getData = () => {
        // 获取表格列表数据
        axios.get(`/api/news?author=${username}&auditState_ne=0&_expand=category`).then(res => {
            setDataSource(res.data)
        })
    }
    return (
        <div>AuditList</div>
    )
}
