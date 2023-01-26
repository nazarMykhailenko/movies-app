import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.scss'
import { Header } from './components/Header'
import { BrowsePage } from './pages/BrowsePage'
import { MoviePage } from './pages/MoviePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { CartPage } from './pages/CartPage'

const App: React.FC = () => {
	return (
		<div className='wrapper'>
			<Header />
			<div className='main'>
				<Routes>
					<Route path='/' element={<BrowsePage />} />
					<Route path='/cart' element={<CartPage />} />
					<Route path='/movie/:title' element={<MoviePage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
