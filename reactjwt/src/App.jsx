import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Account from './components/Account'
import Logout from './components/Logout'
import { useEffect } from 'react'

function App() {

	const loc = useLocation()
	const [loggedIn, setLoggedIn] = useState(false)

	return (
		<main className="container mx-auto">
			<Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/account" element={<Account />} />
				<Route path="/logout" element={<Logout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
			</Routes>
			<div>
				{ loggedIn ? (
					<>
						<h3>Hello</h3><br />
						{ loggedIn &&
							<p>➤ <Link to="/account">Go to your Account panel</Link></p>
						}
					</>
				) : ( loc.pathname === '/login' ? '' : <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> )
				}
			</div>
		</main>
	)
}

export default App
