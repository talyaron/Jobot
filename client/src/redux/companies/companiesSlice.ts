import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Company } from '../../models/company/companyModel'

export interface CompaniesState {
  companies: Company[];
}

const initialState: CompaniesState = {
  companies: [],
}

export const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies.push(action.payload)
    },
    clearCompanies: (state) => {
      state.companies = [] 
    },
    updateCompany: (state, action: PayloadAction<Company>) => {
      const index = state.companies.findIndex(company => company.id === action.payload.id)
      if (index !== -1) {
        state.companies[index] = action.payload 
      }
    },
    removeCompany: (state, action: PayloadAction<string>) => {
      state.companies = state.companies.filter(company => company.id !== action.payload)
    },
  },
})

export const { addCompany, clearCompanies, updateCompany, removeCompany } = companySlice.actions

export default companySlice.reducer
