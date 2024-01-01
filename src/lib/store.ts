import { configureStore } from '@reduxjs/toolkit'
import activePinReducer from './features/activePin/activePinSlice'
import favoriteListReducer from './features/favoriteList/favoriteListSlice'
import placeListReducer from './features/placeList/placeListSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      placeList: placeListReducer,
      activePin: activePinReducer,
      favoriteList: favoriteListReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
