// Account

import { useNavigate } from 'react-router-dom'

const Account = () => {

	const navigate = useNavigate()

	const ph = {
		loginStatus: true,
		username: "John Doe"
	}

	return (
		<> 
			{ !ph.loginStatus ? navigate('/') :
				<section className="section -mt-5">
					<div className="mb-10">
						<h1 className="section__headline">Account</h1>
					</div>
					<div className="account">
						<p>Username: <strong>{ph.username}</strong></p>
					</div>
				</section>
			}
		</>
	)
}

export { Account }
