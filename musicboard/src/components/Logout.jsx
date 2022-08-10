// Logout

import { Navigate } from 'react-router-dom'

const Logout = () => {

	const ph = {
		loginStatus: false,
		username: "John Doe"
	}

	ph.loginStatus = false 

	return <Navigate replace to="/" />
}

export { Logout }
