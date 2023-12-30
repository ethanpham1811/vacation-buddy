import { TActivePoint } from '@/constants/types'
import { createSlice } from '@reduxjs/toolkit'

/**
 * Active point: update upon user clicking on pin's card (left panel or in the map)
 */
export interface ActivePointState {
  data: TActivePoint | null
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
