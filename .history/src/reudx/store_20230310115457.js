import { CollApsedReducer } from './reducers'
import { createStore } from 'redux'

const store = createStore(CollApsedReducer)

export default store