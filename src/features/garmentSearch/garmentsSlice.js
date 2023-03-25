import {createSlice} from '@reduxjs/toolkit';

export const garmentsSlice = createSlice({
  name: 'garments',
  initialState: {
    list: [],
    isLoading: false,
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
    setIsLoading: {
      reducer(state, action) {
        state.isLoading = action.payload
      }
    }
  },
});

export const garmentsSelector = state => state.garments.list
export const isLoadingSelector = state => state.garments.isLoading

export const {setGarments, addGarment, removeGarment, setIsLoading} = garmentsSlice.actions

export default garmentsSlice.reducer
