// Account

import { useState, useEffect } from 'react'
import { Navigate, Link, useLocation } from 'react-router-dom'
import authService from '../utilities/authService'
import betterLog from '../utilities/betterLog'
import Utils from './../utilities/modifier.js'

const
	log = msg => new betterLog({
		debug: true,
		import: import.meta.url
	}).log(msg),

	Account = () => {

		const location = useLocation().pathname.split("/account/")[1]
			
		Utils.setActive({
			location: location,
			active: { "style": { "color": "red" } },
			inactive: { "className": "hover:text-red-500 items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 text-base" }
		})

		const
			userData = key => JSON.parse(localStorage.getItem(key)),
			[username, setUsername] = useState(userData('mb-user')),
			[email, setEmail] = useState(userData('mb-user-email')),
			[regDate, setRegDate] = useState(userData('mb-user-regdate')?.split(/T/)[0]),
			[subscribed, setSubscribed] = useState(userData('mb-user-subscribed') || 'No'),
			[darkMode, setDarkMode] = useState(userData('mb-user-darkmode') || false)
			
		useEffect(() => {
			if (darkMode) {
				document.querySelector('body, section').classList.add('dark-theme')
				localStorage.setItem('mb-user-darkmode', true)			
			} else {
				document.querySelector('body, section').classList.remove('dark-theme')
				localStorage.setItem('mb-user-darkmode', false)
			}
		}, [darkMode])

		return (
			<>
				{!authService.isUser() ? <Navigate replace to="/" /> :
					<section className="section -mt-5">
						<div className="mb-10">
							<h1 className="section__headline">Account</h1>
						</div>
						<div className="account">
							<div id="ccp" className="flex gap-20">
								<div className="ccp-sidebar bg-gray-100 p-5">
									<h3 className="text-[1em] font-bold uppercase">Account Panel</h3><br />
									<ul className="ccp__menu">
										<li className="ccp__menu__item"><Link {...Utils.activeStyle('information')} to="/account/information">Account Information</Link></li>
										<li className="ccp__menu__item"><Link {...Utils.activeStyle('change-username')} to="/account/change-username">Change Username</Link></li>
										<li className="ccp__menu__item"><Link {...Utils.activeStyle('change-email')} to="/account/change-email" >Change Email Address</Link></li>
										<li className="ccp__menu__item"><Link {...Utils.activeStyle('change-password')}to="/account/change-password">Change Password</Link></li>
										<li className="ccp__menu__item"><Link {...Utils.activeStyle('premium')} to="/account/premium">Subscribe for Premium</Link></li>
										<li className="ccp__menu__item"><Link {...Utils.activeStyle('darkmode')} to="/account/darkmode">Toggle Light/Dark Mode</Link></li>
									</ul>
								</div>
								<div className="ccp-forms">
									{ 
										location === 'information' ? 
										<div className="accountinfo">
											<h3>Account Information</h3><br />
											<div className="accountinfo__table">
												<ul>
													<li>Username</li>
													<li>Email</li>
													<li>Registration Date</li>
													<li>Subscription Status</li>
													<li>Dark Mode</li>
												</ul>
												<ul>
													<li><strong>{username}</strong></li>
													<li><strong>{email}</strong></li>
													<li><strong>{regDate}</strong></li>
													<li><strong>{subscribed}</strong></li>
													<li><strong>{darkMode ? 'Enabled' : 'Disabled'}</strong></li>
												</ul>
											</div>
										</div>
										: location === 'change-username' ?
										<>
											<h3 className="text-[1em] font-bold uppercase">Change Username</h3><br />
											<p>Your current username: <span className="current-creds">{username}</span></p><br />
											<form>
												<label htmlFor="ccp__username">Username</label><br />
												<input type="text" name="username" id="ccp__username" className="p-1" required /><br />
												<input type="submit" id="ccp_username__submit" className="cta-red inline mt-5" value="Save" />
											</form>
										</>
										: location === 'change-email' ?
										<>
											<h3 className="text-[1em] font-bold uppercase">Change Email Address</h3><br />
											<p>Your current email address: <span className="current-creds"></span></p><br />
											<form>
												<label htmlFor="ccp__mail">Email Address</label><br />
												<input type="email" name="email" id="ccp__email" className="p-1" required /><br />
												<input type="submit" id="ccp_email__submit" className="cta-red inline mt-5" value="Save" />
											</form>
										</> : location === 'change-password' ?
										<>
											<h3 className="text-[1em] font-bold uppercase">Change Password</h3><br />
											<form>
												<label htmlFor="cpp__current-password">Current Password</label><br />
												<input type="password" name="current_password" id="ccp__current-password" className="p-1" required /><br />

												<label htmlFor="ccp__new-password">New Password</label><br />
												<input type="password" name="new_password" id="ccp__new-password" className="p-1" required /><br />

												<label htmlFor="ccp__confirm-password">Confirm Password</label><br />
												<input type="password" name="confirm_password" id="ccp__confirm-password" className="p-1" required /><br />

												<input type="submit" id="ccp_password__submit" className="cta-red inline mt-5" value="Save" />
											</form>
										</> : location === 'premium' ?
										<>
											<h3 className="text-[1em] font-bold uppercase">Subscribe to Premium</h3><br />
											<span className="current-creds"></span>
											<form>
												<label htmlFor="ccp__creditcardnumber">Credit Card Number</label><br />
												<input type="tel" name="creditcardnumber" id="ccp__creditcardnumber" className="p-1" inputMode="numeric"
													pattern="[0-9\s]{13,19}" maxLength="19" placeholder="xxxx xxxx xxxx xxxx" required /><br />

												<label htmlFor="ccp__zipcode">Billing ZIP Code</label><br />
												<input type="number" name="zipcode" id="ccp__zipcode" className="p-1" inputMode="numeric" pattern="[0-9]{5}" placeholder="xxxxx" required /><br />

												<label htmlFor="ccp__security">Security Code (last 3 digits)</label><br />
												<input type="number" name="secruity" id="ccp__security" className="p-1" inputMode="numeric" pattern="[0-9]{3}" placeholder="xxx" required /><br />

												<input type="submit" id="ccp_subscribe__submit" className="cta-red inline mt-5" value="Subscribe" />
											</form>
										</> : location === 'darkmode' ?
										<>
											<h3 className="text-[1em] font-bold uppercase">Dark Mode</h3><br />
											<form className="form-control">
												<label htmlFor="ccp__dark" className="pb-3">Toggle Dark Mode</label>
												<input type="checkbox" 
													checked={darkMode === true ? true : darkMode === false ? false : undefined}  
													onChange={(e) => setDarkMode(e.target.checked)} 
													name="dark" id="ccp__dark" className="toggle toggle-md toggle-accent bg-red-500" value="true" required 
												/>
											</form>
										</> : undefined}
								</div>
							</div>
						</div>
					</section>
				}
			</>
		)
	}

export { Account }
