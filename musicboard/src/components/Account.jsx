// Account

import { useState, useEffect, useContext } from 'react'
import { Navigate, Link, useLocation } from 'react-router-dom'
import authService from '../utilities/authService'
import betterLog from '../utilities/betterLog'
import Utils from './../utilities/modifier.js'
import AuthContext from './../context/AuthProvider'

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
			inactive: { "className": "inactive" }
		})

		const
			{ ctxUsername, setCtxUsername } = useContext(AuthContext),
			{ ctxEmail, setCtxEmail } = useContext(AuthContext),
			userData = key => JSON.parse(localStorage.getItem(key)),
			regDate = userData('mb-user-regdate')?.split(/T/)[0],
			subscribed = false,

			token = userData('mb-user-token'),

			// Message when registration completes
			[succMsg, setSuccMsg] = useState(false),
			// Message when registration fails
			[errMsg, setErrMsg] = useState(false),

			// Form states
			[username, setUsername] = useState(userData('mb-user')),
			[email, setEmail] = useState(userData('mb-user-email')),
			[curPassword, setCurPassword] = useState(null),
			[newPassword, setNewPassword] = useState(null),
			[matchPassword, setMatchPassword] = useState(null),
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

		const changeUsername = async (e) => {
			e.preventDefault()
			try {
				const response = await authService.updateUsername(ctxUsername)
				await authService.me()
				if (response.status === 200) {
					if (response.data.status === 'success') {
						setUsername(e.target.value)
						setSuccMsg(response.data.message)
					} else setErrMsg(response.data.message) 
				} else if (response.request.status === 422) setErrMsg(response.request.status.message)
				else setErrMsg('Unexpected error. Please try again.')
				log(response)
			} catch (error) {
				log(error)
			}
		}

		const changeEmail = async (e) => {
			e.preventDefault()
			try {
				const response = await authService.updateEmail(ctxEmail)
				await authService.me()
				if (response.status === 200) {
					if (response.data.status === 'success') {
						setEmail(e.target.value)
						setSuccMsg(response.data.message)
					} else setErrMsg(response.data.message) 
				} else if (response.request.status === 422) setErrMsg(response.request.status.message)
				else setErrMsg('Unexpected error. Please try again.')
				log(response)
			} catch (error) {
				log(error)
			}
		}

		const changePassword = async (e) => {
			e.preventDefault()
			// log({ctxEmail,curPassword,matchPassword,newPassword})
			if (newPassword === matchPassword) {
				try {
					const response = await authService.updatePassword(curPassword, newPassword)
					if (response.status === 200) {
						if (response.data.status === 'success') {
							setEmail(e.target.value)
							setSuccMsg(response.data.message)
						} else setErrMsg(response.data.message) 
					} else setErrMsg(response)
					log(response)
				} catch (error) {
					log(error)
				}
			} else {
				setErrMsg('Confirmed password does not match.')
			}
		}

		// Clear validation messages
		const clearMsg = () => {
			setSuccMsg('')
			setErrMsg('')
		}

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
									<h3 className="text-[1em] font-bold uppercase">Menu Panel</h3><br />
									<ul className="ccp__menu">
										<li className="ccp__menu__item" onClick={clearMsg}><Link {...Utils.activeStyle('information')} to="/account/information">Account Information</Link></li>
										<li className="ccp__menu__item" onClick={clearMsg}><Link {...Utils.activeStyle('change-username')} to="/account/change-username">Change Username</Link></li>
										<li className="ccp__menu__item" onClick={clearMsg}><Link {...Utils.activeStyle('change-email')} to="/account/change-email">Change Email Address</Link></li>
										<li className="ccp__menu__item" onClick={clearMsg}><Link {...Utils.activeStyle('change-password')} to="/account/change-password">Change Password</Link></li>
										<li className="ccp__menu__item" onClick={clearMsg}><Link {...Utils.activeStyle('darkmode')} to="/account/darkmode">Toggle Dark Mode</Link></li>
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
														<li><strong>{username || ctxUsername}</strong></li>
														<li><strong>{email || ctxEmail}</strong></li>
														<li><strong>{regDate}</strong></li>
														<li><strong>{subscribed ? 'Yes' : 'No'}</strong></li>
														<li><strong>{darkMode ? 'Enabled' : 'Disabled'}</strong></li>
													</ul>
												</div>
											</div>
										: location === 'change-username' ?
											<>
												<h3 className="text-[1em] font-bold uppercase">Change Username</h3><br />
												<p>Your current username: <span className="current-creds">{username || ctxUsername}</span></p><br />
												<p>To change your username it must contain at least 3 characters</p><br />
												<form onSubmit={changeUsername}>
													<label htmlFor="ccp__username">Username</label><br />
													<input type="text" name="username" id="ccp__username" className="p-1" required 
														onChange={e => setCtxUsername(e.target.value)}/><br />
													<input type="submit" id="ccp_username__submit" onClick={() => {setErrMsg(''); setSuccMsg('')}} className="cta-red inline mt-5" value="Update" />
												</form>
											</>
										: location === 'change-email' ?
											<>
												<h3 className="text-[1em] font-bold uppercase">Change Email Address</h3><br />
												<p>Your current email address: <span className="current-creds">{email || ctxEmail }</span></p><br />
												<p>To change your email address it must be unique and must follow the typical email pattern (name@host.com).</p><br />
												<form onSubmit={changeEmail}>
													<label htmlFor="ccp__mail">Email Address</label><br />
													<input type="email" name="email" id="ccp__email" className="p-1" required 
														onChange={e => setCtxEmail(e.target.value)}/><br />
													<input type="submit" id="ccp_email__submit" onClick={() => {setErrMsg(''); setSuccMsg('')}} className="cta-red inline mt-5" value="Update" />
												</form>
											</>
										: location === 'change-password' ?
											<>
												<h3 className="text-[1em] font-bold uppercase">Change Password</h3><br />
												<p className="instructions">Password needs to meet the following requirements: <br />
													<strong>1</strong> uppercase character (A-Z)<br />
													<strong>1</strong> number (0-9)<br />
													<strong>1</strong> special character (!@$#%)<br />
													<strong>6</strong> characters and a maximum of 24</p><br />
												<form onSubmit={changePassword}>
													<label htmlFor="cpp__current-password">Current Password</label><br />
													<input type="password" name="current_password" id="ccp__current-password" className="p-1" 
														onChange={e => setCurPassword(e.target.value)} required /><br />

													<label htmlFor="ccp__new-password">New Password</label><br />
													<input type="password" name="new_password" id="ccp__new-password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$" className="p-1" 
														onChange={e => setNewPassword(e.target.value)} required /><br />

													<label htmlFor="ccp__confirm-password">Confirm Password</label><br />
													<input type="password" name="confirm_password" id="ccp__confirm-password" className="p-1" 
														onChange={e => setMatchPassword(e.target.value)} required /><br />

													<input type="submit" id="ccp_password__submit" onClick={() => {setErrMsg(''); setSuccMsg('')}} className="cta-red inline mt-5" value="Change Password" />
												</form>
											</>
										: location === 'darkmode' ?
											<>
												<h3 className="text-[1em] font-bold uppercase">Dark Mode</h3><br />
												<form className="form-control">
													<label htmlFor="ccp__dark" className="pb-3">Toggle Dark Mode (Background)</label>
													<input type="checkbox"
														checked={darkMode === true ? true : darkMode === false ? false : undefined}
														onChange={(e) => setDarkMode(e.target.checked)}
														name="dark" id="ccp__dark" className="toggle toggle-md toggle-accent bg-red-500" value="true" required
													/>
												</form>
											</>
										:
											<>
												<h3 className="text-[1em] font-bold uppercase">Customer Account Panel</h3><br />
												<p>This is your customer account panel. <br />
													You can edit your account data using the configuration on the left.</p>
											</>
									}<br />
									<p className={succMsg ? "succmsg" : errMsg ? "errmsg" : ""}>{succMsg || errMsg}</p>
								</div>
							</div>
						</div>
					</section>
				}
			</>
		)
	}

export { Account }
