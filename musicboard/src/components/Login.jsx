// Login

import { useRef, useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import AuthContext from ".././context/AuthProvider"
import axios from ".././utilities/axios"

const
	LOGIN_URL = "/auth",

	Login = () => {

		const
			// Global state variables
			{ setAuth } = useContext(AuthContext),

			// References for the form
			userRef = useRef(),
			errRef = useRef(),

			// State variables
			[user, setUser] = useState(''),
			[pwd, setPwd] = useState(''),
			[errMsg, setErrMsg] = useState(''),
			[success, setSuccess] = useState(false)

		// After pageload
		useEffect(() => userRef.current.focus(), [])
		useEffect(() => setErrMsg(''), [user, pwd])

		const handleSubmit = async (e) => {
			e.preventDefault()

			try {

				const response = await axios.post(LOGIN_URL, 
					JSON.stringify({user, pwd}),
					{
						headers: { "Content-Type": "applications/json"},
						withCredentials: true
					}
				)

				console.log(JSON.stringify(response?.data))

				const 
					accessToken = response?.data.accessToken,
					roles = response?.data?.roles
				
				setAuth({ user, pwd, roles, accessToken})

				setUser("")
				setPwd("")
				setSuccess(true)
			} catch (err) {

			}


		}

		return (
			<section className="section -mt-5">
				{success ? (
					<>
						<div className="mb-10">
							<h1 className="section__headline">Customer Panel</h1>
						</div>
						<div className="login">
							<p>You are logged in!</p>
						</div>
					</>
				) : (
					<>
						<div className="mb-10">
							<h1 className="section__headline">LOG IN</h1>
						</div>
						<div className="login">
							<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
							<form className="login__form" onSubmit={handleSubmit}>
								<label htmlFor="username">Username</label>
								<input className="border-4" type="text" id="username"
									ref={userRef} onChange={(e) => setUser(e.target.value)} value={user} required
								/>
								<label htmlFor="password">Password</label>
								<input className="border-4" type="password" id="password"
									onChange={(e) => setPwd(e.target.value)} value={pwd} required
								/>
								<input id="login" type="submit" value="Log In" />
							</form><br />
							<p>
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
