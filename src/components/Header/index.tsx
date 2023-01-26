import React from 'react'
import { Search } from '../Search'
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai'
import { Status } from '../../@types/abstracts'
import { Form } from '../Form'
import { useAppSelector } from '../../redux/hooks'
import { IAuthenticationState } from '../../redux/authentication/types'
import defaultImg from '../../assets/img/defaultImg.jpg'
import { Navbar } from '../Navbar'
import { Link, useLocation } from 'react-router-dom'
import { selectCart } from '../../redux/cart/select'
import classes from './Header.module.scss'

export const Header: React.FC = () => {
	const location = useLocation()
	const { totalCount } = useAppSelector(selectCart)
	const [isVisible, setVisible] = React.useState(false)
	const [isVisibleNav, setVisibleNav] = React.useState(false)
	const { status, user }: IAuthenticationState = useAppSelector(
		(state) => state.authentication
	)
	const iconRef = React.useRef<HTMLDivElement>(null)

	const showRegistrationForm = () => {
		setVisible((prev) => !prev)
	}

	const toggleActive = () => {
		if (iconRef.current) {
			iconRef.current.classList.toggle(classes._active)
			setVisibleNav((prev) => !prev)
			document.body.classList.toggle(`_locked`)
		}
	}

	const hideFormPopup = () => {
		setVisible(false)
	}

	return (
		<header className={classes.header}>
			<div className={classes.container}>
				<div className={classes.logo}>
					<div onClick={toggleActive} ref={iconRef} className={classes.icon}>
						<span></span>
					</div>
					<Link to='/'>
						<h1>Movieweb</h1>
					</Link>
				</div>
				<div className={classes.other}>
					{location.pathname === `/` && <Search />}
					<Link className={classes.cartIconBlock} to='/cart'>
						<AiOutlineShoppingCart className={classes.otherIcon} />
						{totalCount ? (
							<span className={classes.cartTotalCount}>{totalCount}</span>
						) : (
							``
						)}
					</Link>
					<div className={classes.account}>
						{status === Status.GUEST && (
							<AiOutlineUser
								onClick={showRegistrationForm}
								className={classes.otherIcon}
							/>
						)}
						{user && status === Status.USER && (
							<div className={classes.shortInfo}>
								<h2>{user.login}</h2>
								<img
									src={user.avatar ? user.avatar : defaultImg}
									alt='avatar'
								/>
							</div>
						)}
					</div>
				</div>
			</div>
			{isVisible && <Form hideFormPopup={hideFormPopup} />}
			{isVisibleNav && <Navbar />}
		</header>
	)
}
