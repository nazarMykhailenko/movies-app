import { ICartItem } from './../../@types/abstracts'

export interface ICartState {
	items: ICartItem[]
	totalPrice: number
	totalCount: number
}
