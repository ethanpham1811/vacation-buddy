import { TActivePin } from '@/constants/types'
import { createSlice } from '@reduxjs/toolkit'

/**
 * Active point: update upon user clicking on pin's card (left panel or in the map)
 */
export interface ActivePointState {
  data: TActivePin | null
}

const initialState: ActivePointState = {
  data: null
}

export const activePinSlice = createSlice({
  name: 'activePin',
  initialState,
  reducers: {
    setActivePin: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { setActivePin } = activePinSlice.actions

export default activePinSlice.reducer
