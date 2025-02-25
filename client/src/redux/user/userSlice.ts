import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserState } from '../../models/user/userModel';



const initialState: UserState = {
  fullName: '',
  email: '',
  password: '',
  isAgree: false,
  experienceOfWork: {},
  isCandidate: false,
  CV: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isAgree = action.payload.isAgree;
      state.experienceOfWork = action.payload.experienceOfWork;
      state.isCandidate = action.payload.isCandidate;
      state.CV = action.payload.CV;
    },
    clearUser: (state) => {
      state.fullName = '';
      state.email = '';
      state.password = '';
      state.isAgree = false;
      state.experienceOfWork = {};
      state.isCandidate = false;
      state.CV = '';
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
