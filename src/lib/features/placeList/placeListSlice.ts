import { API_TYPES } from '@/constants/enum'
import { TBounds, TCluster, TPlace } from '@/constants/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Point represent the visible place in map after clusterizing
 */
export interface PlaceListState {
  data: TPlace[]
  loading: boolean
  points: TPlace[]
  clusterizing: boolean
  error: string | null
}

const initialState: PlaceListState = {
  data: [],
  points: [],
  loading: true,
  clusterizing: true,
  error: null
}

export const fetchPlaceList = createAsyncThunk<TPlace[], { signal: AbortSignal; paramType: string; bounds: TBounds }>(
  'placeList/fetchPlaceList',
  async ({ signal, paramType, bounds }) => {
    const [swLng, swLat, neLng, neLat] = bounds || []
    const res = await fetch(`/api/places/${paramType || API_TYPES.attractions}`, {
      method: 'POST',
      body: JSON.stringify({
        tr_lng: neLng,
        tr_lat: neLat,
        bl_lng: swLng,
        bl_lat: swLat,
        isParis: neLng?.toString().startsWith('2.4')
      }),
      signal
    })

    const data = await res.json()
    return data.data as TPlace[]
  }
)

export const placeListSlice = createSlice({
  name: 'placeList',
  initialState, // `createSlice` will infer the state type from the `initialState` argument
  reducers: {
    // filter TPlace[] by point type (exclude cluster type)
    filterBycluster: (state, action) => {
      const clusters: TCluster[] = action.payload?.clusters
      const pointIdList: string[] = clusters?.filter((point) => !point?.properties?.cluster).map((point) => point.properties.id)
      const filteredData: TPlace[] = state.data?.filter((place) => pointIdList.includes(place.id))
      state.points = filteredData
      state.clusterizing = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaceList.pending, (state, action) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPlaceList.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
      })
      .addCase(fetchPlaceList.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch data'
      })
  }
})

export const { filterBycluster } = placeListSlice.actions

export default placeListSlice.reducer
