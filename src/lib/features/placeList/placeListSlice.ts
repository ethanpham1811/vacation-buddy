import { API_TYPES } from '@/constants/enum'
import { TBounds, TCluster, TPlace, TPoint } from '@/constants/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Point represent the visible place in map after clusterizing
 */
export interface PlaceListState {
  data: TPlace[]
  loading: boolean
  points: TPoint[]
  clusterizing: boolean
  error: string | null
}

const initialState: PlaceListState = {
  data: [],
  points: [],
  loading: false,
  clusterizing: true,
  error: null
}

export const fetchPlaceList = createAsyncThunk<TPlace[], { paramType: string; bounds: TBounds }>(
  'placeList/fetchPlaceList',
  async ({ paramType, bounds }) => {
    const [swLng, swLat, neLng, neLat] = bounds || []
    const res = await fetch(`/api/places/${paramType || API_TYPES.attractions}`, {
      method: 'POST',
      body: JSON.stringify({
        tr_lng: neLng,
        tr_lat: neLat,
        bl_lng: swLng,
        bl_lat: swLat
      })
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
      const zoom: number = action.payload?.zoom

      // filter place list to get points list, then add zoom to the points list
      const pointIdList: string[] = clusters?.filter((point) => !point?.properties?.cluster).map((point) => point?.properties?.data?.id)
      const pointList: TPoint[] = state.data?.filter((place) => pointIdList.includes(place.id)).map((place) => ({ ...place, zoom }))
      state.points = pointList
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
