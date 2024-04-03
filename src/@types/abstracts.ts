export enum Status {
	USER = `user`,
	GUEST = `guest`,
}

export interface IFollowing {
	avatar: string
	login: string
	isOnline: boolean
	id: string
}

export interface IUser {
	id: string
	login: string
	password: string
	avatar: string
	email: string
	followings?: Array<IFollowing>
}

export interface IShippingFields {
	login: string
	password: string
	email: string
}

export interface IMovie {
	title: string
	price: number
	year: string
	released: string
	genre: string
	director: string
	writer: string
	actors: string
	plot: string
	awards: string
	imdbRating: string
	imdbID: string
	images: string[]
}

export interface ICartItem {
	count?: number
	title: string
	price: number
	imdbRating: string
	image: string
	genre: string
}
