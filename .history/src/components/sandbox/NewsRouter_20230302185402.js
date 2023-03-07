import React from 'react'

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
