// Account

import useState from 'react'
import { Navigate, Link } from 'react-router-dom'
import authService from '../utilities/authService'

const Account = () => {

	const active = true

	const userData = async () => {
		try {

			const me = await authService.me()
			if (me) {
				console.log(me)
			}
	
		} catch (err) {
			console.log(err)
		}
	}

	userData()

	return (
		<>
			{!authService.isUser() ? <Navigate replace to="/" /> :
				<section className="section -mt-5">
					<div className="mb-10">
						<h1 className="section__headline">Account</h1>
					</div>
					<div className="account">
						<p>Username: <strong>{/*localStorage.getItem('mb-user')*/ }</strong></p>
						<hr />

						<div id="ccp">
							<div className="ccp-sidebar">
								<h3>Account Panel</h3>
								<ul className="ccp__menu">
									<li className="ccp__menu__item"><Link to="#" className="link">Change Username</Link></li>
									<li className="ccp__menu__item"><Link to="#" className="link">Change Email Address</Link></li>
									<li className="ccp__menu__item"><Link to="#" className="link">Change Password</Link></li>
									<li className="ccp__menu__item"><Link to="#" className="link">Subscribe for Premium</Link></li>
									<li className="ccp__menu__item"><Link to="#" className="link">Toggle Light/Dark Mode</Link></li>
								</ul>
							</div>
							<div className="ccp-forms">
								{ active ? 
								<>
									<h3>Change Username</h3>
									<span className="current-creds"></span>
									<form>
										<label htmlFor="ccp__username">Username</label><br />
										<input type="text" name="username" id="ccp__username" required /><br />

										<label htmlFor="ccp__mail">Email Address</label><br />
										<input type="email" name="username" id="ccp__email" required /><br />

										<input type="submit" id="ccp_username__submit" value="Change Username" />
									</form>
								</> :
								<>
									<h3>Change Email Address</h3>
									<span className="current-creds"></span>
									<form>
										<label htmlFor="ccp__mail">Email Address</label><br />
										<input type="email" name="username" id="ccp__email" required /><br />
										<input type="submit" id="ccp_email__submit" value="Change Email" />
									</form>
									<h3>Change Password</h3>
									<form>
										<label htmlFor="cpp__current-password">Current Password</label><br />
										<input type="password" name="current_password" id="ccp__current-password" required /><br />
										
										<label htmlFor="ccp__new-password">New Password</label><br />
										<input type="password" name="new_password" id="ccp__new-password" required /><br />
										
										<label htmlFor="ccp__confirm-password">Confirm Password</label><br />
										<input type="password" name="confirm_password" id="ccp__confirm-password" required /><br />
										
										<input type="submit" id="ccp_password__submit" value="Change Password" />
									</form>
									<h3>Subscribe to Premium</h3>
									<span className="current-creds"></span>
									<form>
										<label htmlFor="ccp__creditcardnumber">Credit Card Number</label><br />
										<input type="tel" name="creditcardnumber" id="ccp__creditcardnumber" inputmode="numeric" 
											pattern="[0-9\s]{13,19}" maxlength="19" placeholder="xxxx xxxx xxxx xxxx" required /><br />
										
										<label htmlFor="ccp__zipcode">Billing ZIP Code</label><br />
										<input type="number" name="zipcode" id="ccp__zipcode" inputmode="numeric" pattern="[0-9]{5}" placeholder="xxxxx" required /><br />
										
										<label htmlFor="ccp__security">Security Code (last 3 digits)</label><br />
										<input type="number" name="secruity" id="ccp__security" inputmode="numeric" pattern="[0-9]{3}" placeholder="xxx" required /><br />

										<input type="submit" id="ccp_subscribe__submit" value="Subscribe" />
									</form>
									<h3>Dark Mode</h3>
									<form>
										<label htmlFor="ccp__dark">Toggle Dark Mode</label><br />
										<input type="checkbox" name="dark" id="ccp__dark" value="Dark Mode" required />
									</form>
								</> }
							</div>
						</div>
					</div>
				</section>
			}
		</>
	)
}

export { Account }
