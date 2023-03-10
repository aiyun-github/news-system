import { CollApsedReducer } from './reducers/CollApsedReducer'
import { combineReducers, createStore } from 'redux'

// 合并多个reducer
const reducer = combineReducers({
    CollApsedReducer
})
const store = createStore(reducer)

export default store