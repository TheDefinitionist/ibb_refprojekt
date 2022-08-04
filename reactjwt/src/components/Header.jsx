import { React } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function Header({loggedIn, setLoggedIn}) {
	const hov = (path = '') => {
		return useLocation().pathname === `/${path}`  ? 
			{ "style": { "color": "red" } } : 
			{ "className": "hover:text-red-500" }
	}

	return (
		<div>
			<h1 className="text-4xl py-4 "><Link to="/">ReactJWT</Link></h1>
			<div>
				<Link to="/" {...hov()}>Home </Link>
				{!loggedIn && <Link to="/login" {...hov('login')}>Login </Link>}
				{!loggedIn && <Link to="/register" {...hov('register')}>Register </Link>}
				{loggedIn && <Link to="/account" {...hov('account')}>Account </Link>}
				{loggedIn && <Link to="/logout" onClick={() => { setLoggedIn(false) }} {...hov('logout')}>Logout</Link>}
				<hr className="mt-2 mb-10" />
			</div>
		</div>
	)
}

export default Header