import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SideMenu from '../../components/sandbox/SideMenu.js'
import TopHeader from '../../components/sandbox/TopHeader.js'
import Home from '../home/Home.js'
import RightList from '../right-manage/RightList.js'
import RoleList from '../right-manage/RoleList.js'
import UserList from '../user-manage/UserList.js'

export default function NewsSandBox() {
  return (
    <div>
      <SideMenu></SideMenu>
      <TopHeader></TopHeader>
      <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/user-manage/list' component={UserList}/>
        <Route path='/right-manage/role/list' component={RoleList}/>
        <Route path='/right-manage/right/list' component={RightList}/>
        <Redirect from='/' to='/home'/>
      </Switch>
    </div>
  )
}
