// MusicBoard App | (c) 2022 Thielicious | https://github.com/thielicious

import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import authService from './utilities/authService'
import Header from './components/Header'
import { Home } from './components/Home'
import { Charts } from './components/Charts'
import { Music } from './components/Music'
import { Culture } from './components/Culture'
import { Media } from './components/Media'
import { Register } from './components/Register'
import { Login } from './components/Login'
import { Account } from './components/Account'
import { Subscribe } from './components/Subscribe'
import { ForgotPW } from './components/ForgotPW'
import { NotFound } from './components/NotFound'
import { ResetPassword } from './components/ResetPassword'
import Footer from './components/Footer'
import './styles/index.scss'
import logo from './assets/logo.svg'



const App = () => {

	const [loggedIn, setLoggedIn] = useState(false)

	useEffect(()=> setLoggedIn(authService.isUser()), [])
	useEffect(()=> {
		if (JSON.parse(localStorage.getItem('mb-user-darkmode'))) {
			document.querySelector('body, section').classList.add('dark-theme')
		} else if (!JSON.parse(localStorage.getItem('mb-user-darkmode'))) {
			document.querySelector('body, section').classList.remove('dark-theme')
		}
	})

	return (
		<>
			<Header logo={logo} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/charts" element={<Charts />} />
					<Route path="/music" element={<Music />} />
					<Route path="/culture" element={<Culture />} />
					<Route path="/media" element={<Media />} />
					<Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
					<Route path="/register" element={<Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
					<Route path="/subscribe" element={<Subscribe />} />
					<Route path="/account" element={<Account />} />
						<Route path="account/information" element={<Account loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
						<Route path="account/change-username" element={<Account loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
						<Route path="account/change-email" element={<Account loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
						<Route path="account/change-password" element={<Account loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
						<Route path="account/premium" element={<Account loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
						<Route path="account/darkmode" element={<Account loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
					<Route path="/forgotpw" element={<ForgotPW loggedIn={loggedIn} />} />
					<Route path="/reset-password/*" element={<ResetPassword />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main >
			<Footer />
		</>
	)
}

export default App
