import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Register from './components/Register'
import Account from './components/Account'
import Logout from './components/Logout'
import Footer from './components/Footer'

function App() {

	function submit(e) {
		e.preventDefault()
	}

	return (
		<div className="App">
			<Header />
			<main>
				<div>
					<h3>Login</h3>
					<form onSubmit={submit}>
						<input type="text" id="email" defaultValue="john@doe.com" /><br />
						<input type="password" id="password" defaultValue="john123" /><br />
						<input type="button" id="submit" defaultValue="Login" />
					</form>
				</div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/account" element={<Account />} />
					<Route path="/logout" element={<Logout />} />
				</Routes>

			</main>
			<Footer />
		</div>
	)
}

export default App
