import { useRef, useState, useEffect } from react
import { Link } from "react-router-dom"

const Login = () => {

	const 
		userRef = useRef()

	return (
		<>
			<section className="section -mt-5">
				<div className="mb-10">
					<h1 className="section__headline">LOG IN</h1>
				</div>
				<div className="login">
					<form className="loginform">
						<label htmlFor="username">Username</label>
						<input className="border-4" type="text" id="username" onChange="" value="" required />
						<label htmlFor="password">Password</label>
						<input className="border-4" type="password" id="password" onChange="" value="" required />
						<input id="login" type="button" value="Log In" />
					</form><br />
					<p>
						<Link className="link" to="/forgotpw">➤ Forgot Password?</Link><br />
						<Link className="link" to="/register">➤ Register</Link>
					</p>
				</div>
			</section>
		</>
	)
}

export { Login }
