import { CollApsedReducer } from './reducers/CollApsedReducer'
import { configureStore, combineReducers } from 'redux'

// 合并多个reducer
const reducer = combineReducers({
    CollApsedReducer
})
const store = configureStore(reducer)

export default store