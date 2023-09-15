import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CarDetailInterface, CarInfo } from '../../Interface';

// Define the initial state interface

// We don't need flexible type so we don't use <T>

interface CarState {
  carList: CarInfo[] | null;
  carDetail: CarDetailInterface | null; // Use null instead of an empty object
  currentStep: number, // Initialize carDetail as null

}

// Define the initial state
const initialState: CarState = {
  carList: [],
  carDetail: null, // Initialize carDetail as null
  currentStep: 0, // Initialize carDetail as null
};

// Creating Redux slice
const configSlice = createSlice({
  name: 'car',
  initialState, // Use the defined initialState
  reducers: {
    getCarList: (state, action: PayloadAction<CarInfo[]>) => {
      state.carList = action.payload;
    },
    setCarDetail: (state, action: PayloadAction<CarDetailInterface>) => {
      state.carDetail = action.payload;
    },
    setChargeProgress: (state, action: PayloadAction<number>) => {
      setTimeout
      state.currentStep = action.payload;
    },
  },
});

// Export action creators and reducer
export const {setChargeProgress , getCarList, setCarDetail } = configSlice.actions;

export default configSlice.reducer;
