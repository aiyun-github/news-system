import axios from 'axios'
import React, { useState, useEffect} from 'react'

export default function Audit() {

    useEffect(() => {
        axios.get(`/news?auditState=1`)
    })
  return (
    <div>Audit</div>
  )
}
