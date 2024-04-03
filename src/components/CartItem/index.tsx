import React from 'react'
import { ICartItem } from '../../@types/abstracts'
import {
	decreaseCount,
	increaseCount,
	removeItem,
} from '../../redux/cart/slice'
import { useAppDispatch } from '../../redux/hooks'
import classes from './CartItem.module.scss'

interface ICartItemProps extends ICartItem {}

export const CartItem: React.FC<ICartItemProps> = (props) => {
	const dispatch = useAppDispatch()
	const { title, image, count } = props

	return (
		<div className={classes.root}>
			<div className={classes.right}>
				<img src={image} alt='movie' />
				<h1>{title}</h1>
			</div>
			<div className={classes.left}>
				<div className={classes.count}>
					<button
						disabled={count === 1}
						onClick={() => dispatch(decreaseCount(title))}
						className={classes.btn}
					>
						-
					</button>
					<div>{count}</div>
					<button
						onClick={() => dispatch(increaseCount(title))}
						className={classes.btn}
					>
						+
					</button>
				</div>
				<div>
					<button
						onClick={() => dispatch(removeItem(title))}
						className={classes.delete}
					>
						X
					</button>
				</div>
			</div>
		</div>
	)
}
