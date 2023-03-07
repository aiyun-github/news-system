import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from '../../views/sandbox/home/Home'
import NewsAdd from '../../views/sandbox/news-manage/NewsAdd'
import NoPermission from '../../views/sandbox/no-permission/NoPermission'
import RightList from '../../views/sandbox/right-manage/RightList'
import RoleList from '../../views/sandbox/right-manage/RoleList'
import UserList from '../../views/sandbox/user-manage/UserList'

const LocalRouterMap = {
    '/home': Home,
    '/user-manage/list': UserList,
    '/right-manage/role/list': RoleList,
    '/right-manage/right/list': RightList,
    '/new-manage/add': NewsAdd,
    '/new-manage/draft': News,
    '/new-manage/category': NewsCategory,
    '/audit-manage/audit': AuditList,
    '/audit-manage/list': AuditList,
    '/publish-manage/unpublished': Unpublished,
    '/publish-manage/published': Published,
    '/publish-manage/sunset': Sunset,
}
export default function NewsRouter() {
    return (
        <Switch>
            <Route path='/home' component={Home} />
            <Route path="/user-manage/list" component={UserList} />
            <Route path="/right-manage/role/list" component={RoleList} />
            <Route path="/right-manage/right/list" component={RightList} />
            <Redirect from="/" to="/home" exact />
            <Route path="*" component={NoPermission} />
        </Switch>
    )
}
