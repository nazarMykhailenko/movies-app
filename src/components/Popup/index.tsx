import React from 'react'
import classes from './Popup.module.scss'

interface IPopupProps {
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const Popup: React.FC<IPopupProps> = ({ setVisible }) => {
	const closePopup = () => {
		setVisible(false)
	}

	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<p>You should log in before registration</p>
				<button className='btn' onClick={closePopup}>
					OK
				</button>
			</div>
		</div>
	)
}
