import { TActivePoint } from '@/constants/types'
import { createSlice } from '@reduxjs/toolkit'

/**
 *
 */
export interface HighlightState {
  data: TActivePoint
}

const initialState: HighlightState = {
  data: null
}

export const activePointSlice = createSlice({
  name: 'activePoint',
  initialState,
  reducers: {
    locatePoint: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { locatePoint } = activePointSlice.actions

export default activePointSlice.reducer
