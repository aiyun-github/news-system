import React from 'react'
import { Switch, Route, Redirect  } from 'react-router-dom'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import Home from '../home/Home'
// import RightList from '../right-manage/RightList'
// import RoleList from '../right-manage/RoleList'
// import UserList from '../user-manage/UserList'

export default function NewsSandBox() {
  return (
    <div>
      <SideMenu></SideMenu>
      <TopHeader></TopHeader>
      <Switch>
        <Route path='/home' component={Home}/>
        {/* <Route path="/user-manage/list" component={UserList} />
        <Route path="/right-manage/role/list" component={RoleList} />
        <Route path="/right-manage/right/list" component={RightList} />
        <Redirect from="/" to="/home" exact /> */}
      </Switch>
    </div>
  )
}
