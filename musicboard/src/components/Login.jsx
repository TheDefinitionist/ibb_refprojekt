// Login

import { useRef, useState, useEffect, useContext } from 'react'
import betterLog from '../utilities/betterLog'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import AuthContext from '.././context/AuthProvider'
import authService from '../utilities/authService'

const 
	log = msg => new betterLog({ 
		debug: true, 
		import: import.meta.url 
	}).log(msg),

	// Login component
	Login = ({loggedIn, setLoggedIn}) => {

		const 
			navigate = useNavigate(),

			// Global state variables
			{ setAuth } = useContext(AuthContext),

			// State variables
			[email, setEmail] = useState(''),
			[pwd, setPwd] = useState(''),
			[errMsg, setErrMsg] = useState(''),

			// Reference for the 'username' input field
			emailRef = useRef()

		// Operations after pageload
		// Redirects after logged in
		// useEffect(() => {
		// 	if (loggedIn == true) navigate("/")
		// }, [loggedIn])
		// Autofocus on 'email' input field
		useEffect(() => {
			if (!loggedIn) emailRef?.current.focus()
		}, [loggedIn])
		// Clear error message when 'email' or 'pwd' state change
		useEffect(() => setErrMsg(""), [email, pwd])

		// Login handler
		const loginHandler = async (e) => {
			e.preventDefault()
			try {
				const response = await authService.login(email, pwd)
				log(response)
            if (response.request.status === 200 && response.data.status === 'success') {
					const accessToken = response?.data.accessToken
					setAuth({ email, pwd, accessToken })
					setEmail("")
					setPwd("")
					setLoggedIn(true)
					navigate("/")
            } else if (response.request.status === 401) {
					setErrMsg('Wrong mail address or password.')
				} else if (!response) {
					setErrMsg('No server response.')
				} else {
					setErrMsg('An unexpected error has occured. Please contact the site admin.')
				}
				//log(JSON.stringify(response?.data))
			} catch (error) {
            log(error)
         }	
		}

		// Rendered content
		return (
			<section className="section -mt-5 md:block">

				{ loggedIn ? ( <Navigate replace to="/" />  // if logged in

				) : ( // if not logged in
					<>
						<div className="mb-10">
							<h1 className="section__headline">LOG IN</h1>
						</div>
						<div className="login">
							
							<form className="login__form" onSubmit={loginHandler}>
								<label htmlFor="email">Email</label>
								<input className="border-4" autoComplete="off" type="email" id="email"
									ref={emailRef} onChange={e => setEmail(e.target.value)} required
								/>
								<label htmlFor="password">Password</label>
								<input className="border-4" type="password" id="password"
									onChange={(e) => setPwd(e.target.value)} required
								/>
								<input id="login" type="submit" value="Log In" /><br />
								<p className={errMsg && "errmsg"}>{errMsg}</p>
								<p>
									Can't remember your login data?<br />
									➤ <Link className="link" to="/forgotpw">Forgot Password</Link><br />
									Need an account?<br />
									➤ <Link className="link" to="/register">Register</Link>
								</p>
							</form>

						</div>
					</>
				)}

			</section>
		)
	}

export { Login }
