import {configureStore} from '@reduxjs/toolkit'
import {cryptoApi} from '../api/cryptoApiHandler'
import {cryptoNewsApi} from '../api/cryptoNewsApiHandler'

const rootReducer = {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store
