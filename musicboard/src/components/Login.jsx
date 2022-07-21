// Login

import { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '.././context/AuthProvider'
import axios from '.././utilities/axios'


const
	// Authentification endpoint
	LOGIN_URL = '/auth',


	// Login component
	Login = () => {

		const
			// Global state variables
			{ setAuth } = useContext(AuthContext),

			// State variables
			[user, setUser] = useState(''),
			[pwd, setPwd] = useState(''),
			[errMsg, setErrMsg] = useState(''),
			[success, setSuccess] = useState(false),

			// Reference for the 'username' input field
			userRef = useRef()

		// Operations after pageload
		// Autofocus on 'username' input field
		useEffect(() => userRef.current.focus(), [])
		// Clear error message when 'user' or 'pwd' state change
		useEffect(() => setErrMsg(""), [user, pwd]) 

		// Submit handler
		const submit = async (e) => {
			e.preventDefault()

			try {

				// Connect and send data to the authentification endpoint
				const response = await axios.post(LOGIN_URL, JSON.stringify({user, pwd}),
					{
						headers: { 'Content-Type': 'applications/json'},
						withCredentials: true
					}
				)
				
				// [Debug] Display the returned data
				console.log(JSON.stringify(response?.data))
				
				// Get access token
				const accessToken = response?.data.accessToken
				
				// Set global state variables with the data requested from the endpoint
				setAuth({ user, pwd, accessToken })

				// Clear the states in the UI and grand success
				setUser("")
				setPwd("")
				setSuccess(true)
			} catch (err) {
				let error = err?.response

				// Error handling
				if (!error) setErrMsg("No Server Response") 
				else if (error?.status === 400) setErrMsg("Missing Username or Password")
				else if (error?.status === 401) setErrMsg("Unauthorized")
				else setErrMsg("Login Failed")
			}
		}

		// Rendered content
		return (
			<section className="section -mt-5">

				{success ? ( // if logged in
					<>
						<div className="mb-10">
							<h1 className="section__headline">Customer Panel</h1>
						</div>
						<div className="login">
							<p>You are logged in!</p>
						</div>
					</>

				) : ( // if not logged in
					<>
						<div className="mb-10">
							<h1 className="section__headline">LOG IN</h1>
						</div>
						<div className="login">
							
							<form className="login__form" onSubmit={submit}>
								<label htmlFor="username">Username</label>
								<input className="border-4" type="text" id="username"
									ref={userRef} onChange={e => setUser(e.target.value)} required
								/>
								<label htmlFor="password">Password</label>
								<input className="border-4" type="password" id="password"
									onChange={e => setPwd(e.target.value)} required
								/>
								<input id="login" type="submit" value="Log In" />
							</form>

							<p className={errMsg && "errmsg"}>{errMsg}</p><br />
							<p className="text-sm">
								<Link className="link" to="/forgotpw">➤ Forgot Password?</Link><br />
								<Link className="link" to="/register">➤ Register</Link>
							</p>
						</div>
					</>
				)}

			</section>
		)
	}

export { Login }
