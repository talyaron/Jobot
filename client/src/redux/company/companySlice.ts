import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CompanyState {
  id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  isAgree: boolean;
}

const initialState: CompanyState = {
  id: '', 
  name: '',
  phone: '',
  email: '',
  password: '',
  isAgree: false,
}

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<CompanyState>) => {
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isAgree = action.payload.isAgree;
    },
    clearCompany: (state) => {
      state.name = '';
      state.phone = '';
      state.email = '';
      state.password = '';
      state.isAgree = false;
    },
  },
})

export const { setCompany, clearCompany } = companySlice.actions

export default companySlice.reducer
