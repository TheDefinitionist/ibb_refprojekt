// Logout

import { Navigate, useNavigate } from 'react-router-dom'
import authService from '../utilities/authService'

const Logout = ({setLoggedIn}) => {

	setLoggedIn(false)
	authService.logout()
	

	return <Navigate replace to="/" />
}

export { Logout }
