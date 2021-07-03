import { createSlice } from '@reduxjs/toolkit'
import { nextCons } from '../common/functions'

const slice = createSlice({
  name: 'signReducer',
  initialState: {
    fullySelectedTime: nextCons(new Date())[0],
  },
  reducers: {
    changeFullySelectedTime: (state, action) => {
      state.fullySelectedTime = action.payload
    },
  },
})

export const signReducer = slice.reducer

export const {
  changeFullySelectedTime,
} = slice.actions
