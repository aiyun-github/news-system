import React from 'react'
import Home from './home/Home'
import NoPermission from './no-permission/NoPermission'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import UserList from './user-manage/UserList'

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
