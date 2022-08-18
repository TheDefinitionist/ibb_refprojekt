// ResetPassword

import { useRef, useState, useEffect } from 'react'
import { FaCheck, FaTimes/*, FaCircle*/ } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import betterLog from '../utilities/betterLog'
import authService from '../utilities/authService'


// Regex validation
const
	PWD_RGX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/,
	log = msg => new betterLog({ 
		debug: true, 
		import: import.meta.url 
	}).log(msg),


	// ResetPassword component
	ResetPassword = () => {

		const
			loc = useLocation(),
			// Received resetToken from the password reset email
			token = loc.pathname.replace('/reset\-password/', ''),
			email = decodeURIComponent(window.location.toString().split(/email=/)[1]),
		
			// Form references
			userRef = useRef(),

			// Form states 
			[pwd, setPwd] = useState(""),
			[matchPwd, setMatchPwd] = useState(""), 
			[errMsg, setErrMsg] = useState(""),
			[succMsg, setSuccMsg] = useState(""),

			// States for checking Regex
			[mustInclude, setMustInclude] = useState({
				lower: false, upper: false, minmax: false,
				number: false, special: false
			}),

			// Form validation
			[validPwd, setValidPwd] = useState(false),
			[validMatch, setValidMatch] = useState(false)

		// Operations after pageload
		// Autofocus on 'username' input field
		useEffect(() => userRef.current.focus(), [])

		useEffect(() => {
			// Check 'password' validation and if it matches
			setValidPwd(PWD_RGX.test(pwd))
			setValidMatch(pwd === matchPwd)

			// Additionally Check which characters are still missing
			setMustInclude({
				lower: /[a-z]/.test(pwd),
				upper: /[A-Z]/.test(pwd),
				minmax: /^.{6,24}$/.test(pwd),
				number: /[0-9]/.test(pwd),
				special: /[!@#$%]/.test(pwd)
			})
			// Clear error message every time when form states change
			setErrMsg("")
		}, [pwd, matchPwd])

		// log({email, token})

		// Submit to reset password
		const handlePasswortReset = async e => {
         e.preventDefault()
         if (pwd === matchPwd) {
            try {
               const response = await authService.resetPw(token, email, pwd, matchPwd)
               log(response)
               if (response.request.status === 200 && response.data?.status === 'success') {
                  setSuccMsg('New password has been successfully set.')
               }
               else if (response.request.status === 422) {
                  setErrMsg('Password doesn\'t meet the requirements.')
               } else {
                  setErrMsg('Unexpected error. Please try again.')
               }
            } catch (error) {
               log(error)
               setErrMsg('Unexpected error. Please try again.')
            }
         } else {
            setErrMsg('Confirmed password does not match.')
         }
      }

		// Small shortcuts
		const 
			incl = mustInclude,
			// Check button status
			invalid = !validPwd || !validMatch,
			// Classes
			rgx = ['checkrgx--false', 'checkrgx--true'],
			valid = <span>✓</span>

		// Rendered content
		return (
			<section className="section -mt-5">

				{ succMsg ? ( // if password is reset
					<>
						<div className="mb-10">
							<h1 className="section__headline">SUCCESS!</h1>
						</div>
						<div className="login">
							<p>You successfully created a new password. You can now proceed to <Link className="link" to="/login">log in</Link>.</p>
						</div>
					</>

				) : ( // if not reset
					<>
						<div className="mb-10">
							<h1 className="section__headline">RESET PASSWORD</h1>
						</div>
						<div className="resetpw">
							
							<form className="resetpw__form" onSubmit={handlePasswortReset}>
								<input className="border-4" type="hidden" name="token" id="token"
									 value={token}
								/>
								<label htmlFor="password">Password {validPwd && valid}</label>
								<input className="border-4" type="password" name="password" id="password"
									ref={userRef} onChange={(e) => setPwd(e.target.value)} required
								/>
								<label htmlFor="confirm_password">Confirm Password {matchPwd && validMatch && valid}</label>
								<input className="border-4" type="password" name="password_confirmation" id="password_confirmation"
									onChange={(e) => setMatchPwd(e.target.value)} required
								/>
								<input id="resetpw" value="Reset Password" type="submit"
									className={invalid ? "disabled" : null}
									disabled={invalid ? true : false}
								/><br></br>
								<p className={errMsg && "errmsg"}>{errMsg}</p>
								<p>Go back to <br />➤ <Link className="link" to="/">Home</Link></p>
							</form><br />

							<div className="instructions">
								<p><strong>Your new password</strong> must include at least:<br />
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

export { ResetPassword }
