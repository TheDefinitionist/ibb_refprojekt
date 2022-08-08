import { React } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function Header({logged, logout }) {
	const 
		log = logged,
		hov = (path = '') => {
			return useLocation().pathname === `/${path}`  ? 
				{ "style": { "color": "red" } } : 
				{ "className": "hover:text-red-500" }
		}

	return (
		<div>
			<h1 className="text-4xl py-4 "><Link to="/">ReactJWT</Link></h1>
			<div className="flex justify-between w-[200px]">
				<Link to="/" {...hov()}>Home </Link>
				{!log.loggedIn && <Link to="/login" {...hov('login')}>Login </Link>}
				{!log.loggedIn && <Link to="/register" {...hov('register')}>Register </Link>}
				{log.loggedIn && <Link to="/account" {...hov('account')}>Account </Link>}
				{log.loggedIn && <Link to="/logout" onClick={() => { log.setLoggedIn(false); log.setLoggedOut(true); logout() }} {...hov('logout')}>Logout</Link>}
				<hr className="mt-2 mb-10" />
			</div>
		</div>
	)
}

export default Header