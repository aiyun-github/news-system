import axios from 'axios'
import React, { useState, useEffect} from 'react'

export default function Audit() {
    const [dataSource, setDataSource] = useState([])
    const { roleId, region, username } = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        axios.get(`/news?auditState=1&_expand=category`)
    })
  return (
    <div>Audit</div>
  )
}
