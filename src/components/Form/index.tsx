import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Error } from './Error'
import { IShippingFields, IUser } from '../../@types/abstracts'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { IAuthenticationState } from '../../redux/authentication/types'
import { Status } from '../../@types/abstracts'
import { v4 as uuidv4 } from 'uuid'
import { setUser, setStatus } from '../../redux/authentication/slice'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import classes from './Form.module.scss'

export const Form: React.FC<{ hideFormPopup: () => void }> = ({
	hideFormPopup,
}) => {
	const overlayRef = React.useRef<HTMLDivElement>(null)
	const [isVisible, setVisible] = React.useState(false)

	const dispatch = useAppDispatch()
	const { status, user }: IAuthenticationState = useAppSelector(
		(state) => state.authentication
	)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IShippingFields>()

	const onSubmit: SubmitHandler<IShippingFields> = (data) => {
		const user: IUser = {
			avatar: ``,
			login: data.login,
			email: data.email,
			password: data.password,
			id: uuidv4(),
		}
		dispatch(setUser(user))
		dispatch(setStatus(Status.USER))
		hideFormPopup()
		reset()
	}

	const togglePassword = () => {
		setVisible((prev) => !prev)
	}

	return (
		<div ref={overlayRef} className={classes.root}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<header>
					<h1>Log In</h1>
					<span onClick={hideFormPopup}>X</span>
				</header>
				<main>
					<input
						{...register('login', {
							required: 'Login is require field!',
							minLength: { value: 8, message: `Minimus length is 8 units` },
							maxLength: { value: 16, message: `Maximum length is 16 units` },
						})}
						type='text'
						placeholder='Login'
					/>
					{errors.login && <Error message={errors.login.message} />}
					<input
						{...register('email', {
							required: 'Email is require field!',
							pattern: {
								value:
									/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
								message: `Please enter valid email!`,
							},
						})}
						type='email'
						placeholder='Email'
					/>
					{errors.email && <Error message={errors.email.message} />}
					<div className={classes.inputBlock}>
						<input
							{...register('password', {
								required: 'Password is require field!',
								minLength: { value: 8, message: `Minimus length is 8 units` },
							})}
							type={isVisible ? `text` : `password`}
							placeholder='Password'
						/>
						{isVisible ? (
							<AiFillEye
								className={classes.inputBlockIcon}
								onClick={togglePassword}
							/>
						) : (
							<AiFillEyeInvisible
								className={classes.inputBlockIcon}
								onClick={togglePassword}
							/>
						)}
					</div>
					{errors.password && <Error message={errors.password.message} />}
				</main>
				<footer>
					{user && status === Status.USER ? (
						`You already logged in`
					) : (
						<button className='btn'>Send</button>
					)}
				</footer>
			</form>
		</div>
	)
}
