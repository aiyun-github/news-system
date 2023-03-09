import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Audit from '../../views/sandbox/audit-manage/Audit'
import AuditList from '../../views/sandbox/audit-manage/AuditList'
import Home from '../../views/sandbox/home/Home'
import NewsAdd from '../../views/sandbox/news-manage/NewsAdd'
import NewsCategory from '../../views/sandbox/news-manage/NewsCategory'
import NewsDraft from '../../views/sandbox/news-manage/NewsDraft'
import NewsPreview from '../../views/sandbox/news-manage/NewsPreview'
import NoPermission from '../../views/sandbox/no-permission/NoPermission'
import Published from '../../views/sandbox/publish-manage/Published'
import Sunset from '../../views/sandbox/publish-manage/Sunset'
import Unpublished from '../../views/sandbox/publish-manage/Unpublished'
import RightList from '../../views/sandbox/right-manage/RightList'
import RoleList from '../../views/sandbox/right-manage/RoleList'
import UserList from '../../views/sandbox/user-manage/UserList'

// 路由和组件映射
const LocalRouterMap = {
    '/home': Home,
    '/user-manage/list': UserList,
    '/right-manage/role/list': RoleList,
    '/right-manage/right/list': RightList,
    '/news-manage/add': NewsAdd,
    '/news-manage/draft': NewsDraft,
    '/news-manage/category': NewsCategory,
    '/news-manage/preview/:id': NewsPreview,
    '/audit-manage/audit': Audit,
    '/audit-manage/list': AuditList,
    '/publish-manage/unpublished': Unpublished,
    '/publish-manage/published': Published,
    '/publish-manage/sunset': Sunset,
}
export default function NewsRouter() {
    const [backRouteList, setBackRouteList] = useState([])
    useEffect(() => {
        // 获取后端权限列表
        Promise.all([
            axios.get('/api/rights'),
            axios.get('/api/children'),
        ]).then(res => {
            setBackRouteList([...res[0].data, ...res[1].data])
        })
    }, [])
    // 获取当前登录用户权限列表
    const { role: { rights } } = JSON.parse(localStorage.getItem('token'))
    // 开关是否打开
    const checkRoute = (item) => {
        return LocalRouterMap[item.key] && item.pagepermisson
    }
    // 当前登录用户是否有权限
    const checkUserPermission = (item) => {
        return rights.includes(item.key)
    }
    return (
        <Switch>
            {
                backRouteList.map(item =>{
                    if(checkRoute(item) && checkUserPermission(item)){
                        return <Route path={item.key} key={item.key} component={LocalRouterMap[item.key]} exact/>
                    }
                    return null
                })
            }
            <Redirect from="/" to="/home" exact />
            {
                backRouteList.length && <Route path="*" component={NoPermission} />
            }
        </Switch>
    )
}
