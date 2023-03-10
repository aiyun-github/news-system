import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import {store} from './reudx/store'
import IndexRouter from './router/IndexRouter'
import { PersistGate } from 'redux-persist/integration/react'

export default function App() {
    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}></PersistGate>
        <IndexRouter />
        </PersistGate>
    </Provider>
}
