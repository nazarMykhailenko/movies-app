import { IUser } from './../../@types/abstracts'
import { Status } from '../../@types/abstracts'

export interface IAuthenticationState {
	status: Status
	user?: IUser
}
