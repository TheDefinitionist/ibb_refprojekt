// Login

import { useRef, useState, useEffect } from 'react'
import betterLog from '../utilities/betterLog'
import authService from '../utilities/authService'

const 
	log = msg => new betterLog({ 
		debug: true, 
		import: import.meta.url 
	}).log(msg),

	// Login component
	ForgotPW = ({loggedIn}) => {

		const 
			// State variables
			[email, setEmail] = useState(''),
			[errMsg, setErrMsg] = useState(''),
			[succMsg, setSuccMsg] = useState(''),

			// Reference for the 'username' input field
			emailRef = useRef()

		// Operations after page render
		// Autofocus on 'email' input field
		useEffect(() => {
			if (!loggedIn) emailRef?.current.focus()
		}, [loggedIn])
		// Clear error message when 'email' or 'pwd' state change
		useEffect(() => setErrMsg(''), [email])
		useEffect(() => setSuccMsg(''), [email])

		// Login handler
		const forgotPWHandler = async (e) => {
			e.preventDefault()
			try {
				const response = await authService.forgotPw(email)
            if (response) {
					log(response)
					if (response.data?.status === 'success') {
						setSuccMsg('Please follow the instructions we sent you per mail.')
					} else if (response.data?.status === 'error') {
						if (response.data?.sendResetLinkStatus === 'passwords.throttled') { 
							setErrMsg('You were requesting password resets too many times. Please wait a moment.')
						} else {
							setErrMsg('The email is not registered.')
						}
					} else if (response.response?.status === 422) {
						setErrMsg('The email must be a valid email address.')
					} else {
						setErrMsg('Something unexpected happened. Please try again.')
					}
				}  else if (!response) {
					setErrMsg('No server response.')
				} else {
					setErrMsg('An unexpected error has occured. Please contact the support.')
				}
			} catch (error) {
            log(error)
         }	
		}

		// Rendered content
		return (
			<section className="section -mt-5 md:block">
				<div className="mb-10">
					<h1 className="section__headline">FORGOT PASSWORD</h1>
				</div>
				<div className="forgotpw">
					
					<form className="forgotpw__form" onSubmit={forgotPWHandler}>
						<label htmlFor="email">Email</label>
						<input className="border-4" autoComplete="off" type="email" id="email"
							ref={emailRef} onChange={e => setEmail(e.target.value)} required
						/>
						<input id="sendforgotpw" type="submit" value="Submit" /><br />
						<p className={errMsg ? "errmsg" : succMsg ? "succmsg" : ""}>{errMsg || succMsg}</p>
					</form><br />

					<div className="instructions">
						<p>If you forgot your password you can request to reset the password. <br />
						Enter your mail address you registered with and we will inform you via mail with further instructions.</p><br />
					</div>

				</div>
			</section>
		)
	}

export { ForgotPW }
