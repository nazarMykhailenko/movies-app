import React from 'react'
import { Link } from 'react-router-dom'
import classes from './NotFoundPage.module.scss'

export const NotFoundPage: React.FC = () => {
	const style: React.CSSProperties = {
		height: `100%`,
		display: `flex`,
		alignItems: `center`,
		justifyContent: `center`,
		flexDirection: `column`,
		paddingTop: `20rem`,
	}

	return (
		<div className={classes.root}>
			<div style={style} className='container'>
				<div className={classes.error}>404</div>
				<p>Something went wrong</p>
				<Link to='/' className={classes.btn}>
					Back to homepage
				</Link>
			</div>
		</div>
	)
}
