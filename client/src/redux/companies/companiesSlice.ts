import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CompaniesState {
  id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  isAgree: boolean;
}

const initialState: CompaniesState[] = []

export const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<CompaniesState>) => {
      state.push(action.payload)
    },
    clearCompanies: () => {
      return [] 
    },
    updateCompany: (state, action: PayloadAction<CompaniesState>) => {
      const index = state.findIndex(company => company.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload 
      }
    },
    removeCompany: (state, action: PayloadAction<string>) => {
      return state.filter(company => company.id !== action.payload)
    },
  },
})

export const { addCompany, clearCompanies, updateCompany, removeCompany } = companySlice.actions

export default companySlice.reducer
