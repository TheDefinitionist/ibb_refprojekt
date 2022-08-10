// MusicBoard App | (c) 2022 Thielicious | https://github.com/thielicious

import { Routes, Route } from 'react-router-dom'
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
import { Logout } from './components/Logout'
import Footer from './components/Footer'
import './styles/index.scss'

const App = () => {

	return (
		<>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/charts" element={<Charts />} />
					<Route path="/music" element={<Music />} />
					<Route path="/culture" element={<Culture />} />
					<Route path="/media" element={<Media />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/logout" element={<Logout />} />
					<Route path="/subscribe" element={<Subscribe />} />
					<Route path="/account" element={<Account />} />
				</Routes>
			</main >
			<Footer />
		</>
	)
}

export default App
