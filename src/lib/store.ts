import { configureStore } from '@reduxjs/toolkit'
import activePointReducer from './features/activePoint/activePointSlice'
import favoriteListReducer from './features/favoriteList/favoriteListSlice'
import placeListReducer from './features/placeList/placeListSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      placeList: placeListReducer,
      activePoint: activePointReducer,
      favoriteList: favoriteListReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
