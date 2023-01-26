import { IMovie } from './../../@types/abstracts'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IFetchParams, IMoviesState, StatusMoviesLoading } from './types'

const initialState: IMoviesState = {
	movies: [],
	statusMoviesLoading: StatusMoviesLoading.LOADING,
}

export const fetchMovies = createAsyncThunk<IMovie[], IFetchParams>(
	`movies/fetchMovies`,
	async ({ currentPage, searchValue }) => {
		const pageParams = !currentPage ? `` : `page=${currentPage}&limit=4`

		const { data } = await axios.get(
			`https://63bc170ecf99234bfa6eb00f.mockapi.io/movies?${pageParams}${
				searchValue ? `&title=${searchValue.toLocaleLowerCase()}` : ``
			}`
		)

		return data as IMovie[]
	}
)

export const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchMovies.pending, (state: IMoviesState) => {
			state.movies = []
			state.statusMoviesLoading = StatusMoviesLoading.LOADING
		})
		builder.addCase(
			fetchMovies.fulfilled,
			(state: IMoviesState, action: PayloadAction<IMovie[]>) => {
				state.movies = action.payload
				state.statusMoviesLoading = StatusMoviesLoading.SUCCESS
			}
		)
		builder.addCase(fetchMovies.rejected, (state: IMoviesState) => {
			state.movies = []
			state.statusMoviesLoading = StatusMoviesLoading.ERROR
		})
	},
})

export default moviesSlice.reducer
