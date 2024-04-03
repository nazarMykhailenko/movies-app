import { IMovie } from '../../@types/abstracts'

export enum StatusMoviesLoading {
	LOADING = `loading`,
	ERROR = `error`,
	SUCCESS = `success`,
}

export interface IMoviesState {
	statusMoviesLoading: StatusMoviesLoading
	movies: IMovie[]
}

export interface IFetchParams {
	currentPage: number
	searchValue: string
}
