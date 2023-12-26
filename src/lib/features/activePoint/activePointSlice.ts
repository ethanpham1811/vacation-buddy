import { TActivePoint } from '@/constants/types'
import { createSlice } from '@reduxjs/toolkit'

/**
 *
 */
export interface ActivePointState {
  data: TActivePoint
}

const initialState: ActivePointState = {
  data: null
}

export const activePointSlice = createSlice({
  name: 'activePoint',
  initialState,
  reducers: {
    setActivePoint: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { setActivePoint } = activePointSlice.actions

export default activePointSlice.reducer
