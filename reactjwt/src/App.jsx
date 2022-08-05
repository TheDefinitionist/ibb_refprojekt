import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Account from './components/Account'
import Logout from './components/Logout'
import Err404 from './components/Err404'

function App() {

	const
		loc = useLocation(),
		[loggedIn, setLoggedIn] = useState(false),
		[registered, setRegistered] = useState(false),
		[loggedOut, setLoggedOut] = useState(false)

	return (
		<main className="container mx-auto">
			<Header logged={{loggedIn, setLoggedIn, setLoggedOut}} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
				<Route path="/register" element={<Register />} />
				<Route path="/account" element={<Account />} />
				<Route path="/logout" element={<Logout loggedOut={loggedOut} setLoggedOut={setLoggedOut} />} />
				<Route path="*" element={<Err404 />} />
			</Routes>
			<div>
				{ loggedIn ? 
					<>
						{ loggedIn &&
							 loc.pathname !== '/account' ? 
							 <p><br />➤ Go to your <Link to="/account" className="text-red-500 hover:underline">Account</Link> panel.</p> : '' }
					</>
				 : loc.pathname === '/login' ? '' : <Login setLoggedIn={setLoggedIn} />
				}
			</div>
		</main>
	)
}

export default App
