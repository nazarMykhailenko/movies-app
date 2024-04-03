import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser, Status } from '../../@types/abstracts'
import { IAuthenticationState } from './types'

const initialState: IAuthenticationState = {
	status: Status.GUEST,
}

export const authenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		setStatus(state, action: PayloadAction<Status>) {
			state.status = action.payload
		},
		setUserAvatar(state, action: PayloadAction<string>) {
			if (state.user) {
				state.user.avatar = action.payload
			}
		},
		setUserLogin(state, action: PayloadAction<string>) {
			if (state.user) {
				state.user.login = action.payload
			}
		},
		setUser(state, action: PayloadAction<IUser>) {
			state.user = action.payload
		},
	},
})

export const { setStatus, setUserAvatar, setUserLogin, setUser } =
	authenticationSlice.actions

export default authenticationSlice.reducer
