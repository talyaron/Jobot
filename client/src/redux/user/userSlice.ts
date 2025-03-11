import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserState } from '../../models/user/userModel';



const initialState: UserState = {
  _id: '',
  fullName: '',
  email: '',
  password: '',
  phoneNumber: '',
  experienceOfWork: {},
  isHiring: false,
  isCandidate: false,
  CV: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state._id = action.payload._id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.phoneNumber = action.payload.phoneNumber;
      state.experienceOfWork = action.payload.experienceOfWork;
      state.isHiring = action.payload.isHiring;
      state.isCandidate = action.payload.isCandidate;
      state.CV = action.payload.CV;
    },
    clearUser: (state) => {
      state._id = '';
      state.fullName = '';
      state.email = '';
      state.password = '';
      state.phoneNumber = '';
      state.isHiring = false;
      state.isCandidate = false;
      state.experienceOfWork = {};
      state.CV = '';
    },
  },
})

export const { setUser, clearUser } = userSlice.actions;

export const userSelector = (state: { user: UserState }) => state.user;

export default userSlice.reducer
