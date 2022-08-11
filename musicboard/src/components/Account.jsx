// Account

import { Navigate } from 'react-router-dom'
import authService from '../utilities/authService'

const Account = () => {

	return (
		<> 
			{ !authService.isUser() ? <Navigate replace to="/" /> :
				<section className="section -mt-5">
					<div className="mb-10">
						<h1 className="section__headline">Account</h1>
					</div>
					<div className="account">
						<p>Username: <strong>{localStorage.getItem('mb-user')}</strong></p>
					</div>
				</section>
			}
		</>
	)
}

export { Account }
