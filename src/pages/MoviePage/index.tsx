import React from 'react'
import { useParams } from 'react-router-dom'
import { Slider } from '../../components/Slider'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectMovies } from '../../redux/movies/selectors'
import { fetchMovies } from '../../redux/movies/slice'
import { StatusMoviesLoading } from '../../redux/movies/types'
import { addItem } from '../../redux/cart/slice'
import { ICartItem, IMovie, Status } from '../../@types/abstracts'
import { selectCart } from '../../redux/cart/select'
import classes from './MoviePage.module.scss'
import { selectAuthentication } from '../../redux/authentication/selectors'
import { Popup } from '../../components/Popup'

export const MoviePage: React.FC = () => {
	const dispatch = useAppDispatch()
	const { title } = useParams()
	const { status } = useAppSelector(selectAuthentication)
	const { statusMoviesLoading, movies } = useAppSelector(selectMovies)
	const currentMovie: IMovie | undefined = movies.find(
		(movie) => movie.title === title
	)
	const { items } = useAppSelector(selectCart)
	const [isVisible, setVisible] = React.useState<boolean>(false)

	const count = items.find((item) => item.title === title)?.count

	React.useEffect(() => {
		dispatch(fetchMovies({ currentPage: 0, searchValue: `` }))
	}, [])

	let cartItem = {}

	if (currentMovie) {
		cartItem = {
			count: 1,
			title: currentMovie.title,
			price: currentMovie.price,
			imdbRating: currentMovie.imdbRating,
			image: currentMovie.images[0],
			genre: currentMovie.genre,
		}
	}

	const addToCart = () => {
		if (status === Status.USER) {
			dispatch(addItem(cartItem as ICartItem))
		} else {
			setVisible(true)
		}
	}

	return (
		<div className={classes.root}>
			<div className='container'>
				{statusMoviesLoading === StatusMoviesLoading.ERROR ? (
					<div className={classes.error}>Error</div>
				) : statusMoviesLoading === StatusMoviesLoading.SUCCESS &&
				  currentMovie ? (
					<div className={classes.content}>
						<Slider
							rating={currentMovie.imdbRating}
							images={currentMovie.images}
						/>
						<div className={classes.description}>
							<header>
								<h1 className={classes.title}>{currentMovie.title}</h1>
								<div className={classes.release}>{currentMovie.released}</div>
							</header>
							<main>
								<div className={classes.genres}>{currentMovie.genre}</div>
								<p className={classes.text}>{currentMovie.plot}</p>
								{currentMovie.actors ? (
									<div>Actors: {currentMovie.actors}</div>
								) : (
									``
								)}
								{currentMovie.writer ? (
									<div>Writer: {currentMovie.writer}</div>
								) : (
									``
								)}
								{currentMovie.director ? (
									<div>Director: {currentMovie.director}</div>
								) : (
									``
								)}
							</main>
							<footer>
								<div>{currentMovie.awards}</div>
								<div className={classes.buttonBlock}>
									<button onClick={addToCart} className='btn'>
										Add to cart{' '}
										{count ? <div className={classes.count}>{count}</div> : ``}
									</button>
									<div>{currentMovie.price}$</div>
								</div>
							</footer>
						</div>
					</div>
				) : (
					<div className={classes.loading}>Loading</div>
				)}
			</div>
			{isVisible && <Popup setVisible={setVisible} />}
		</div>
	)
}
