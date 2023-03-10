import { CollApsedReducer } from './reducers/CollApsedReducer'
import { createStore, combineReducers } from 'redux'

// 合并多个reducer
const reducer = combineReducers({
    CollApsedReducer
})
const store = createStore(reducer)

export default store