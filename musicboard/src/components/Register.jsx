// Register

import { useRef, useState, useEffect } from 'react'
import { FaCheck, FaTimes, FaCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'


// Input validation
const 
	USER_RGX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/,
	PWD_RGX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
	
	
	// Register component
	Register = () => {

		const 
			
			// Form references
			userRef = useRef(), errRef = useRef(),
			
			// Form states
			[user, 		setUser, 
			pwd, 			setPwd, 
			matchPwd, 	setMatchPwd, 
			errMsg, 		setErrMsg] = Array(8).fill(useState(""))
		
		const
			// Form validation
			[validName, setValidName] = useState(false),
			[validPwd, 	setValidPwd] = useState(false), 
			[validMatch, setValidMatch] = useState(false),
			
			// Form input focus
			[userFocus, 	setUserFocus] = useState(false),
			[pwdFocus, 	setPwdFocus] = useState(false),
			[matchFocus, setMatchFocus] = useState(false),
			
			// Login success
			[success, 	setSuccess] = useState(false)

		// Operations after pageload
		// Autofocus on 'username' input field
		useEffect(() => userRef.current.focus(), [])
		// Check 'username' validation
		useEffect(() => setValidName(USER_RGX.test(user)), [user])
		// Check 'password' validation and if it matches
		useEffect(() => {
			setValidPwd(PWD_RGX.test(pwd))
			setValidMatch(pwd === matchPwd)
		}, [pwd, matchPwd])
		// Clear error message every time when form states change
		useEffect(() => setErrMsg(""), [user, pwd, matchPwd])

		return (
			<>
				<section className="section -mt-5">
					<div className="mb-10">
						<h1 className="section__headline">REGISTER</h1>
					</div>
					<div className="register">
						<p className={errMsg && "errmsg"}>{errMsg}</p>
						<form className="login__form">
							<label htmlFor="username">Username</label>
							<input className="border-4" type="text" id="username"
								ref={userRef} 
								onChange={e=> setUser(e.target.value)} 
								onFocus={()=> setUserFocus(true)}
								onBlur={()=> setUserFocus(false)}
								required
							/>
							<label htmlFor="password">Password</label>
							<input className="border-4" type="password" id="password"
								onChange={e => setPwd(e.target.value)} required
							/>
							<input id="login" type="submit" value="Log In" />
						</form><br />
						<p>Do you already an account? <Link className="link" to="/login">Login</Link></p>
					</div>
				</section>
			</>
		)
	}

export { Register }
