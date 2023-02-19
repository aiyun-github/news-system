import React from 'react'
import { Switch, Route, Redirect  } from 'react-router-dom'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import Home from '../home/Home'
import RightList from '../right-manage/RightList'
import RoleList from '../right-manage/RoleList'
import UserList from '../user-manage/UserList'

export default function NewsSandBox() {
  return (
    <div>
      <SideMenu></SideMenu>
      <TopHeader></TopHeader>
      <Switch>
        <Route path="/home" component={(props) => <Home {...props}/>} />
        <Route path="/user-manage/list" component={(props) => <UserList {...props}/>} />
        <Route path="/right-manage/role/list" component={(props) => <RoleList {...props}/>} />
        <Route path="/right-manage/right/list" component={(props) => <RightList {...props}/>} />
        <Redirect from="/" to="/home" exact />
      </Switch>
    </div>
  )
}
