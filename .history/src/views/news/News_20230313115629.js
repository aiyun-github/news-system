import axios from 'axios'
import React, { useEffect } from 'react'

export default function News() {
    useEffect(() => {
        axios.get('/api/news?publishState=2&_expand=category').then(res => {
            
        })
    }, [])
  return (
    <div>News</div>
  )
}
