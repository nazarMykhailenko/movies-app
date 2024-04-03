import React from 'react'
import { Link } from 'react-router-dom'
import { CartItem } from '../../components/CartItem'
import { EmptyCart } from '../../components/EmptyCart'
import { selectCart } from '../../redux/cart/select'
import { clearCart } from '../../redux/cart/slice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import classes from './CartPage.module.scss'

export const CartPage: React.FC = () => {
	const dispatch = useAppDispatch()
	const { items, totalPrice } = useAppSelector(selectCart)

	return (
		<div className={classes.root}>
			<div className={`container ${classes.container}`}>
				<header>
					<h1>Cart</h1>
					<div onClick={() => dispatch(clearCart())}>Clear cart</div>
				</header>
				<main>
					{!items.length ? (
						<EmptyCart />
					) : (
						items.map((item, index) => <CartItem {...item} key={index} />)
					)}
				</main>
				<footer>
					<Link to='/' className='btn'>
						Go back
					</Link>
					{totalPrice ? <div>Total price: {totalPrice}$</div> : ``}
				</footer>
			</div>
		</div>
	)
}
