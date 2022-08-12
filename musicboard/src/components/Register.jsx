// Register

import { useRef, useState, useEffect } from 'react'
import { FaCheck, FaTimes/*, FaCircle*/ } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import betterLog from '../utilities/betterLog'
import authService from '.././utilities/authService'


// Regex validation
const
	USER_RGX = /^[a-zA-Z][a-zA-Z0-9-_]{3,24}$/,
	MAIL_RGX = /\S+[^$]@\S+\.\S+/,
	PWD_RGX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/,
	log = msg => new betterLog({ 
		debug: true, 
		import: import.meta.url 
	}).log(msg),


	// Register component
	Register = ({loggedIn, setLoggedIn}) => {

		const
			// Form references
			userRef = useRef(),

			// Form states
			[user, setUser] = useState(""),
			[mail, setMail] = useState(""), 
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
			[validMail, setValidMail] = useState(false), 
			[validPwd, setValidPwd] = useState(false),
			[validMatch, setValidMatch] = useState(false),

			// Registration complete
			[succMsg, setSuccMsg] = useState(false)

		// Operations after pageload
		// Autofocus on 'username' input field
		useEffect(() => userRef.current.focus(), [])


		useEffect(() => {
			// Check 'username' validation
			setValidName(USER_RGX.test(user))
			// Check 'mail' validation
			setValidMail(MAIL_RGX.test(mail))
			// Check 'password' validation and if it matches
			setValidPwd(PWD_RGX.test(pwd))
			setValidMatch(pwd === matchPwd)

			// Additionally Check which characters are still missing
			setMustInclude({
				lower: /[a-z]/.test(pwd),
				upper: /[A-Z]/.test(pwd),
				minmax: /^.{4,24}$/.test(pwd),
				number: /[0-9]/.test(pwd),
				special: /[!@#$%]/.test(pwd)
			})
			// Clear error message every time when form states change
			setErrMsg("")
		}, [user, mail, pwd, matchPwd])

		// Submit to register
		const handleRegister = async e => {
         e.preventDefault()
         if (pwd === matchPwd) {
            try {
               const response = await authService.register(user, mail, pwd)
               log(response)
               if (response.request.status === 200 && response.data?.status === 'success') {
                  setSuccMsg('Registration was successful.')
               }
               else if (response.request.status === 422) {
                  setErrMsg('Mail address already in use.')
               } else {
                  setErrMsg('Something else is wrong.')
               }
            } catch (error) {
               log(error)
               setErrMsg('An unexpected error has occured.')
            }
         } else {
            setErrMsg('Confirmed password does not match.')
         }
      }

		// Small shortcuts
		const 
			incl = mustInclude,
			// Check button status
			invalid = !validName || !validPwd || !validMatch || !validMail,
			// Classes
			rgx = ['checkrgx--false', 'checkrgx--true'],
			valid = <span>✓</span>

		// Rendered content
		return (
			<section className="section -mt-5">

				{succMsg ? ( // if successfully registered
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
							
							<form className="register__form" onSubmit={handleRegister}>
								<label htmlFor="username">Username {validName && valid}</label>
								<input className="border-4" autoComplete="off" type="text" id="username"
									ref={userRef} onChange={e => setUser(e.target.value)} required
								/>
								<label htmlFor="mail">Mail Address {validMail && valid}</label>
								<input className="border-4" autoComplete="off" type="email" id="mail"
									onChange={e => setMail(e.target.value)} required
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
								<p>Do you already have an account?<br />➤ <Link className="link" to="/login">Login</Link></p>
							</form><br />

							<div className="instructions">
								<p><strong>Username</strong> can contain uppercase, lowercase letters, numbers as well as underscores and hyphens.<br/>
									It must contain at least 6 characters and a maximum of 24.</p><br />
								<p><strong>Mail address</strong> must meet the email pattern (ex. name@host.com).</p><br />
								<p><strong>Password</strong> must include at least:<br />
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
										<span className="instructions__facheck">{incl.minmax ? <FaCheck /> : <FaTimes />}</span> 4 characters and a maximum of 24
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
