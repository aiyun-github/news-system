import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from '../views/login/login'
import NewsSandBox from '../views/sandbox/NewsSandBox'

export default function IndexRouter() {
  return (
    <HashRouter>
        <Switch>
            <Route path='/login' component={Login}/>
            {/* <Route path='/' component={NewsSandBox}/> */}
            <Route path='/' component={() => 
                localStorage.getItem('token') ? <NewsSandBox/> : <Redirect to='/login'/>
            }/>
        </Switch>
    </HashRouter>
  )
}
