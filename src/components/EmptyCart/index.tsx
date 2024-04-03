import React from 'react'
import { Link } from 'react-router-dom'
import img from '../../assets/img/empty-cart.png'
import classes from './EmptyCart.module.scss'

export const EmptyCart: React.FC = () => {
	return (
		<div className={classes.root}>
			<img src={img} alt='Empty Cart' />
			<h1>Your cart is empty</h1>
			<p>
				Looks like you have not added anything to your cart. Go ahead and
				explore out best movies.
			</p>
		</div>
	)
}
