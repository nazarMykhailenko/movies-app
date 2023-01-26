import React from 'react'
import { Link } from 'react-router-dom'
import { IMovie } from '../../@types/abstracts'
import { selectCart } from '../../redux/cart/select'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Status } from '../../@types/abstracts'
import { addItem } from '../../redux/cart/slice'
import { ICartItem } from '../../@types/abstracts'
import { AiFillStar } from 'react-icons/ai'
import { selectAuthentication } from '../../redux/authentication/selectors'
import classes from './Movie.module.scss'
import { Popup } from '../Popup'

interface IMovieProps extends IMovie {}

export const Movie: React.FC<IMovieProps> = (props) => {
	const { images, title, genre, imdbRating, price } = props
	const dispatch = useAppDispatch()
	const { status } = useAppSelector(selectAuthentication)
	const { items } = useAppSelector(selectCart)
	const [isVisible, setVisible] = React.useState<boolean>(false)

	const count = items.find((item) => item.title === title)?.count

	const cartItem = {
		count: 1,
		title: title,
		price: price,
		imdbRating: imdbRating,
		image: images[0],
		genre: genre,
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
			<Link to={`movie/${title}`}>
				<img src={images[0]} alt='Poster' />
				<div className={classes.ratingBox}>
					<div className={classes.rating}>
						<AiFillStar className={classes.icon} />
						<span>{imdbRating}</span>
					</div>
				</div>
			</Link>
			<footer>
				<div className={classes.desc}>
					<h2>{title}</h2>
					<h3>{genre}</h3>
				</div>
				<div className={classes.footerRight}>
					<button onClick={addToCart} className='btn'>
						buy {count ? <div className={classes.count}>{count}</div> : ``}
					</button>
					<div>{price}$</div>
				</div>
			</footer>
			{isVisible && <Popup setVisible={setVisible} />}
		</div>
	)
}
