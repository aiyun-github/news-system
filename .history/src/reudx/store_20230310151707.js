import { CollApsedReducer } from './reducers/CollApsedReducer'
import { LoadingReducer } from './reducers/LoadingReducer'
import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// 合并多个reducer
const reducer = combineReducers({
    CollApsedReducer,
    LoadingReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['LoadingReducer'] // 黑名单（不做持久化）
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export {
    store,
    persistor,
}