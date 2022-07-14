// import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import { Main } from './components/Main'
import Header from './components/Header'
import './styles/index.scss'



const App = () => {

	return (
		<>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<Main />} />
				</Routes>
			</main >
			<Footer />
		</>
	)
}

export default App
