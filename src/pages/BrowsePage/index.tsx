import React from 'react'
import { Skeleton } from '../../components/Movie/Skeleton'
import { Movie } from '../../components/Movie'
import { Pagination } from '../../components/Pagination'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectMovies } from '../../redux/movies/selectors'
import { fetchMovies } from '../../redux/movies/slice'
import { StatusMoviesLoading } from '../../redux/movies/types'
import { selectFilters } from '../../redux/filters/select'
import classes from './BrowsePage.module.scss'

export const BrowsePage: React.FC = () => {
	const dispatch = useAppDispatch()
	const { movies, statusMoviesLoading } = useAppSelector(selectMovies)
	const { currentPage, searchValue } = useAppSelector(selectFilters)

	React.useEffect(() => {
		dispatch(fetchMovies({ currentPage, searchValue }))
	}, [currentPage, searchValue])

	const style = {
		padding: 0,
		width: `100%`,
	}

	return (
		<div className={classes.root}>
			<div className={`container ${classes.movieContainer}`}>
				{statusMoviesLoading === StatusMoviesLoading.ERROR
					? `something went wrong`
					: statusMoviesLoading === StatusMoviesLoading.LOADING
					? Array(4)
							.fill(null)
							.map((_, index) => <Skeleton key={index} />)
					: movies.map((movie) => <Movie key={movie.imdbID} {...movie} />)}
			</div>
			<div style={style} className='container'>
				<Pagination />
			</div>
		</div>
	)
}
