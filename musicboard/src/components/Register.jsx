// Register

import { useRef, useState, useEffect } from 'react'
import { FaCheck, FaTimes, FaCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'


// Regex validation
const
	USER_RGX = /^[a-zA-Z][a-zA-Z0-9-_]{4,18}$/,
	PWD_RGX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/,


	// Register component
	Register = () => {

		const
			// Form references
			userRef = useRef(), errRef = useRef(),

			// Form states
			[user, setUser] = useState(""), 
			[pwd, setPwd] = useState(""),
			[matchPwd, setMatchPwd] = useState(""), 
			[errMsg, setErrMsg] = useState(""),

			// states for checking Regex
			[mustInclude, setMustInclude] = useState({
				lower: false, upper: false,
				number: false, special: false
			})

		const
			// Form validation
			[validName, setValidName] = useState(false), 
			[validPwd, setValidPwd] = useState(false),
			[validMatch, setValidMatch] = useState(false),

			// Registration complete
			[success, setSuccess] = useState(false)

		// Operations after pageload
		// Autofocus on 'username' input field
		useEffect(() => userRef.current.focus(), [])

		// Check 'username' validation
		useEffect(() => setValidName(USER_RGX.test(user)), [user])

		// Check which characters are still missing
		useEffect(() => {
			setMustInclude({
				lower: /[a-z]/.test(pwd),
				upper: /[A-Z]/.test(pwd),
				number: /[0-9]/.test(pwd),
				special: /[\!\@\#\$\%]/.test(pwd)
			})
		}, [pwd])

		// Check 'password' validation and if it matches
		useEffect(() => {
			setValidPwd(PWD_RGX.test(pwd))
			setValidMatch(pwd === matchPwd)
		}, [pwd, matchPwd])
		
		// Clear error message every time when form states change
		useEffect(() => setErrMsg(""), [user, pwd, matchPwd])

		// Submit to register
		const submit = async e => {
			e.preventDefault()

			// Extra button condition against JS hack
			if (!USER_RGX.test(user) || !PWD_RGX.test(pwd)) {
				setErrMsg("Invalid Entry")
			}

			console.log(user, pwd)
			setSuccess(true)

			/*try {
	
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
			}*/
		}

		// Small shortcuts
		const 
			incl = mustInclude,
			// Check button status
			invalid = !validName || !validPwd || !validMatch

		// Rendered content
		return (
			<section className="section -mt-5">

				{success ? ( // if logged in
					<>
						<div className="mb-10">
							<h1 className="section__headline">SUCCESS!</h1>
						</div>
						<div className="login">
							<p>Your registration has succeeded. You can now proceed to <Link className="link" to="/login">log in</Link>.</p>
						</div>
					</>

				) : ( // if not logged in
					<>
						<div className="mb-10">
							<h1 className="section__headline">REGISTER</h1>
						</div>
						<div className="register">
							<form className="register__form" onSubmit={submit}>
								<label htmlFor="username">Username</label>
								<input className="border-4" type="text" id="username"
									ref={userRef} onChange={e => setUser(e.target.value)} required
								/>
								<label htmlFor="password">Password</label>
								<input className="border-4" type="password" id="password"
									onChange={e => setPwd(e.target.value)} required
								/>
								<label htmlFor="confirm_pwd">Confirm Password</label>
								<input className="border-4" type="password" id="confirm_pwd"
									onChange={e => setMatchPwd(e.target.value)} required
								/>
								<input id="register" value="Register" type="submit"
									className={invalid ? "disabled" : null}
									disabled={invalid ? true : false}
								/><br></br>
								<p className={errMsg && "errmsg"}>{errMsg}</p>
								<p className="text-s">Do you already have an account?<br /><Link className="link" to="/login">➤ Login</Link></p>
							</form><br />
							<div className="instructions">
								<p>Password must include at least:<br />
									<span className={incl.lower ? "checkrgx--true" : "checkrgx--false"}>
										<span className="instructions__facheck">{incl.lower ? <FaCheck /> : <FaTimes />}</span> 1 lowercase character (a-z)
									</span><br />
									<span className={incl.upper ? "checkrgx--true" : "checkrgx--false"}>
										<span className="instructions__facheck">{incl.upper ? <FaCheck /> : <FaTimes />}</span> 1 uppercase character (A-Z)
									</span><br />
									<span className={incl.number ? "checkrgx--true" : "checkrgx--false"}>
										<span className="instructions__facheck">{incl.number ? <FaCheck /> : <FaTimes />}</span> 1 number (0-9)
									</span><br />
									<span className={incl.special ? "checkrgx--true" : "checkrgx--false"}>
										<span className="instructions__facheck">{incl.special ? <FaCheck /> : <FaTimes />}</span> 1 special character (!@$#%)
									</span><br />
									<span className={incl.minmax ? "checkrgx--true" : "checkrgx--false"}>
										<span className="instructions__facheck">{incl.minmax ? <FaCheck /> : <FaTimes />}</span> 6 characters and a maximum of 24
									</span><br />
								</p>
							</div>
						</div>
					</>
				)}
			</section>
		)
	}

export { Register }
