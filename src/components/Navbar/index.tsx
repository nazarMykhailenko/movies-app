import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiFillCompass, AiOutlineHeart } from 'react-icons/ai'
import classes from './Navbar.module.scss'

export const Navbar: React.FC = () => {
	return (
		<div className={classes.root}>
			<div className={classes.feed}>
				<h2 className={classes.title}>News Feed</h2>
				<ul className={classes.list}>
					<li className={classes.item}>
						<NavLink
							to='/'
							className={({ isActive }) =>
								isActive ? classes.active : classes.link
							}
						>
							<AiFillCompass className={classes.listIcon} />
							Browse
						</NavLink>
					</li>
					<li className={classes.item}>
						<NavLink
							className={({ isActive }) =>
								isActive ? classes.active : classes.link
							}
							to='/cart'
						>
							<AiOutlineHeart className={classes.listIcon} />
							Cart
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	)
}
