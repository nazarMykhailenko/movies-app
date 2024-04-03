import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { IFiltersState } from './types'

const initialState: IFiltersState = {
	searchValue: ``,
	currentPage: 1,
}

export const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
	},
})

export const { setSearchValue, setCurrentPage } = filtersSlice.actions

export default filtersSlice.reducer
