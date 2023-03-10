import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import store from './reudx/store'
import IndexRouter from './router/IndexRouter'

export default function App() {
    return <Provider store={store}>
        <IndexRouter />
    </Provider>
}
