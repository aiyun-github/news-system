import React from 'react'
import IndexRouter from './router/IndexRouter'
import './App.css'
import store from './reudx/store'
import { Provider } from 'react-redux'

export default function App() {
    return <Provider store={store}>
        <IndexRouter />
    </Provider>
}
