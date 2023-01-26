import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { ICartItem } from '../../@types/abstracts'
import { ICartState } from './types'

const initialState: ICartState = {
	items: [],
	totalPrice: 0,
	totalCount: 0,
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<ICartItem>) {
			const currentItem = state.items.find(
				(item) => item.title === action.payload.title
			)

			if (action.payload.count && currentItem?.count) {
				// if movie is already exist we only increase count
				currentItem.count += 1
			} else {
				// if it is not already exist
				state.items.push({ ...action.payload, count: 1 })
			}

			// increase price and count
			state.totalCount += 1
			state.totalPrice += action.payload.price
		},
		removeItem(state, action: PayloadAction<string>) {
			const currentItem = state.items.find(
				(item) => item.title === action.payload
			)

			if (currentItem && currentItem.count) {
				state.items = state.items.filter(
					(item) => item.title !== action.payload
				)

				state.totalCount -= currentItem.count
				state.totalPrice -= currentItem.count * currentItem.price
			}
		},
		clearCart(state) {
			state.items = []
			state.totalPrice = 0
			state.totalCount = 0
		},
		decreaseCount(state, action: PayloadAction<string>) {
			const currentItem = state.items.find(
				(item) => item.title === action.payload
			)

			if (currentItem && currentItem?.count) {
				currentItem.count -= 1
				state.totalCount -= 1
				state.totalPrice -= currentItem.price
			}
		},
		increaseCount(state, action: PayloadAction<string>) {
			const currentItem = state.items.find(
				(item) => item.title === action.payload
			)

			if (currentItem && currentItem?.count) {
				currentItem.count += 1
				state.totalCount += 1
				state.totalPrice += currentItem.price
			}
		},
	},
})

export const { addItem, removeItem, clearCart, increaseCount, decreaseCount } =
	cartSlice.actions

export default cartSlice.reducer
