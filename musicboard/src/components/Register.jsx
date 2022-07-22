// Register

import { useRef, useState, useEffect } from 'react'
import { FaCheck, FaTimes, FaCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from '.././utilities/axios'


// Regex validation
const
	USER_RGX = /^[a-zA-Z][a-zA-Z0-9-_]{3,24}$/,
	PWD_RGX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/,
	REGISTER_URL = "/register",


	// Register component
	Register = () => {

		const
			// Form references
			userRef = useRef(),
			// Form states
			[user, setUser] = useState(""), 
			[pwd, setPwd] = useState(""),
			[matchPwd, setMatchPwd] = useState(""), 
			[errMsg, setErrMsg] = useState(""),
			// states for checking Regex
			[mustInclude, setMustInclude] = useState({
				lower: false, upper: false, minmax: false,
				number: false, special: false
			}),
			// Form validation
			[validName, setValidName] = useState(false), 
			[validPwd, setValidPwd] = useState(false),
			[validMatch, setValidMatch] = useState(false),
			// Registration complete
			[success, setSuccess] = useState(false)

		// Operations after pageload
		// Autofocus on 'username' input field
		useEffect(() => userRef.current.focus(), [])
		useEffect(() => {
			// Check 'password' validation and if it matches
			setValidPwd(PWD_RGX.test(pwd))
			setValidMatch(pwd === matchPwd)
			// Check 'username' validation
			setValidName(USER_RGX.test(user))
			// Additionally Check which characters are still missing
			setMustInclude({
				lower: /[a-z]/.test(pwd),
				upper: /[A-Z]/.test(pwd),
				minmax: /^.{4,24}$/.test(pwd),
				number: /[0-9]/.test(pwd),
				special: /[\!\@\#\$\%]/.test(pwd)
			})
			// Clear error message every time when form states change
			setErrMsg("")
		}, [user, pwd, matchPwd])

		// Submit to register
		const submit = async e => {
			e.preventDefault()
			// Extra condition against JS hack
			if (!validName || !validPwd) {
				setErrMsg("Invalid Entry")
				return
			}
			try {
				const response = await axios.post(REGISTER_URL, 
					JSON.stringify({ username: user, password: pwd }),
					{
						headers: { 'Content-Type': 'applications/json'},
						withCredentials: true
					}
				)
				setSuccess(true)
				// [Debug]
				/*console.log(response.data)
				console.log(response.accessToken)
				console.log(JSON.stringify(response))*/
			} catch (err) {
				// Error handling
				let error = err?.response
				if (!error) setErrMsg("No Server Response") 
				else if (error?.status === 409) setErrMsg("Username Taken")
				else setErrMsg("Registration Failed")
			}
		}

		// Small shortcuts
		const 
			incl = mustInclude,
			// Check button status
			invalid = !validName || !validPwd || !validMatch,
			// Classes
			rgx = ['checkrgx--false', 'checkrgx--true'],
			valid = <FaCheck />

		// Rendered content
		return (
			<section className="section -mt-5">

				{success ? ( // if successfully registered
					<>
						<div className="mb-10">
							<h1 className="section__headline">SUCCESS!</h1>
						</div>
						<div className="login">
							<p>Your registration has succeeded. You can now proceed to <Link className="link" to="/login">log in</Link>.</p>
						</div>
					</>

				) : ( // if unregistered
					<>
						<div className="mb-10">
							<h1 className="section__headline">REGISTER</h1>
						</div>
						<div className="register">
							
							<form className="register__form" onSubmit={submit}>
								<label htmlFor="username">Username {validName && valid}</label>
								<input className="border-4" type="text" id="username"
									ref={userRef} onChange={e => setUser(e.target.value)} required
								/>
								<label htmlFor="password">Password {validPwd && valid}</label>
								<input className="border-4" type="password" id="password"
									onChange={(e) => setPwd(e.target.value)} required
								/>
								<label htmlFor="confirm_pwd">Confirm Password {matchPwd && validMatch && valid}</label>
								<input className="border-4" type="password" id="confirm_pwd"
									onChange={(e) => setMatchPwd(e.target.value)} required
								/>
								<input id="register" value="Register" type="submit"
									className={invalid ? "disabled" : null}
									disabled={invalid ? true : false}
								/><br></br>
								<p className={errMsg && "errmsg"}>{errMsg}</p>
								<p>Do you already have an account?<br /><Link className="link" to="/login">➤ Login</Link></p>
							</form><br />

							<div className="instructions">
								<p>Username can contain uppercase (A),<br />lowercase letters(a), numbers(0)<br />as well as underscores and hyphens</p><br />
									<p>Password must include at least:<br />
									<span className={incl.lower ? rgx[1] : rgx[0]}>
										<span className="instructions__facheck">{incl.lower ? <FaCheck /> : <FaTimes />}</span> 1 lowercase character (a-z)
									</span><br />
									<span className={incl.upper ? rgx[1] : rgx[0]}>
										<span className="instructions__facheck">{incl.upper ? <FaCheck /> : <FaTimes />}</span> 1 uppercase character (A-Z)
									</span><br />
									<span className={incl.number ? rgx[1] : rgx[0]}>
										<span className="instructions__facheck">{incl.number ? <FaCheck /> : <FaTimes />}</span> 1 number (0-9)
									</span><br />
									<span className={incl.special ? rgx[1] : rgx[0]}>
										<span className="instructions__facheck">{incl.special ? <FaCheck /> : <FaTimes />}</span> 1 special character (!@$#%)
									</span><br />
									<span className={incl.minmax ? rgx[1] : rgx[0]}>
										<span className="instructions__facheck">{incl.minmax ? <FaCheck /> : <FaTimes />}</span> 4 and maximum of 24 characters
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
