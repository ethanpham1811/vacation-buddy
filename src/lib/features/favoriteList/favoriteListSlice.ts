import { FAVORITE_COOKIE } from '@/constants/enum'
import { TFavorite } from '@/constants/types'
import { createSlice } from '@reduxjs/toolkit'
import cookie from 'js-cookie'

/**
 * Favorite List:
 * - add
 * - remove
 */
const getInitialDataFromCookie = (): TFavorite[] => {
  const cookieData = cookie.get(FAVORITE_COOKIE)
  return cookieData ? JSON.parse(cookieData) : []
}

export interface FavoriteListState {
  data: TFavorite[]
}

const initialState: FavoriteListState = {
  data: getInitialDataFromCookie()
}

export const favoriteListSlice = createSlice({
  name: 'favoriteList',
  initialState, // `createSlice` will infer the state type from the `initialState` argument
  reducers: {
    addFavorite: (state, action) => {
      if (state.data.some(({ id }) => id === action.payload.id)) return

      const newList = [...state.data, action.payload]
      // update state
      state.data = newList
      // update cookie
      cookie.set(FAVORITE_COOKIE, JSON.stringify(newList))
    },
    removeFavorite: (state, action) => {
      const newList = [...state.data.filter((item) => item.id !== action.payload)]
      // update state
      state.data = newList
      // update cookie
      cookie.set(FAVORITE_COOKIE, JSON.stringify(newList))
    }
  }
})

export const { addFavorite, removeFavorite } = favoriteListSlice.actions

export default favoriteListSlice.reducer
