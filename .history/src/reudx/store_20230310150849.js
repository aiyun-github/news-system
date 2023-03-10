import { CollApsedReducer } from './reducers/CollApsedReducer'
import { LoadingReducer } from './reducers/LoadingReducer'
import { combineReducers, createStore } from 'redux'

const persistConfig = {
    key: 'root',
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)

// 合并多个reducer
const reducer = combineReducers({
    CollApsedReducer,
    LoadingReducer,
})
const store = createStore(reducer)

export default store