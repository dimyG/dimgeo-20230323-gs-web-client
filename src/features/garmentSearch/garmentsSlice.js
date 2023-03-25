import {createSlice} from '@reduxjs/toolkit';

export const garmentsSlice = createSlice({
  name: 'garments',
  initialState: {
    list: [],
  },
  reducers: {
    setGarments: {
      reducer(state, action) {
        state.list = action.payload
      }
    },
    addGarment: {
      reducer(state, action) {
        state.list.push(action.payload)
      },
    },
    removeGarment(state, action) {
      const id = action.payload
      state.list = state.list.filter(garment => garment._id !== id)
    },
  },
});

export const garmentsSelector = state => state.garments.list

export const {setGarments, addGarment, removeGarment} = garmentsSlice.actions

export default garmentsSlice.reducer
