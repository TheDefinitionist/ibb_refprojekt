// authService

import axios from "axios"
import betterLog from "./betterLog"

const API_BASE_URL = "http://localhost:8000/api",
	LOCAL_USER = "mb-user",
	LOCAL_EMAIL = LOCAL_USER + "-email",
	LOCAL_TOKEN = LOCAL_USER + "-token",
	LOCAL_REGDATE = LOCAL_USER + "-regdate",
	LOCAL_DARKMODE = LOCAL_USER + "-darkmode",
	log = (msg) =>
		new betterLog({
			debug: true,
			import: import.meta.url,
		}).log(msg)

const restApi = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: false,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "PUT,POST,DELETE,GET,OPTIONS",
		"Access-Control-Allow-Headers": "Origin,Accept,Authorization,Content-Type,Set-Cookie",
		Accept: "application/json",
	},
})

restApi.interceptors.request.use(
	config => {
		const token = JSON.parse(localStorage.getItem(LOCAL_TOKEN))
		if (token) config.headers["Authorization"] = `Bearer ${token}`
		return config
	},
	error => Promise.reject(error)
)

const register = async (name, email, password) => {
		return await restApi.post("/register", { name, email, password })
			.then((response) => {
				log(response)
				return response
			}).catch((err) => {
				log(err)
				return err
			})
	},

	login = async (email, password) => {
		return await restApi.post("/login", { email, password })
			.then((response) => {
				log(response)
				if (response.data.authorization.token) {
					localStorage.setItem(LOCAL_TOKEN, JSON.stringify(response.data.authorization.token))
					localStorage.setItem(LOCAL_USER, JSON.stringify(response.data.user.name))
					localStorage.setItem(LOCAL_EMAIL, JSON.stringify(response.data.user.email))
					localStorage.setItem(LOCAL_REGDATE, JSON.stringify(response.data.user.created_at))
					localStorage.setItem(LOCAL_DARKMODE, false)
				}
				return response
			}).catch((err) => {
				log(err)
				return err
			})
	},

	isUser = () => JSON.parse(localStorage.getItem(LOCAL_USER)),
	
	me = async () => {
		return await restApi.get("/me").then((response) => {
				log(response)
				if (response.data.status === "success") {
					localStorage.setItem(LOCAL_USER, JSON.stringify(response.data.user.name))
					localStorage.setItem(LOCAL_EMAIL, JSON.stringify(response.data.user.email))
					localStorage.setItem(LOCAL_REGDATE, JSON.stringify(response.data.user.created_at))
				}
				return response
			}).catch((err) => {
				log(err)
				return err
			})
	},

	forgotPw = async (email) => {
		return await restApi.post("/forgot-password", { email })
			.then((response) => {
				log(response)
				return response
			}).catch((err) => {
				log(err)
				return err
			})
	},

	resetPw = async (token, email, password, password_confirmation) => {
		return await restApi.post("/reset-password", {
				token: token,
				email: email,
				password: password,
				password_confirmation: password_confirmation,
			}).then((response) => {
				log(response)
				return response
			}).catch((err) => {
				log(err)
				return err
			})
	},

	updateUsername = async (username) => {
		try {
			const userID = await restApi.get("/me")
			return await restApi.put("/updateusername/"+userID.data.user.id, {
					name: username
				}).then((response) => {
					log(response)
					return response
				}).catch((err) => {
					log(err)
					return err
				})
		} catch (err) {
			log(err)
			return err
		} 
	},

	updateEmail = async (email) => {
		try {
			const userID = await restApi.get("/me")
			return await restApi
				.put("/updateemail/"+userID.data.user.id, {
					email: email
				}).then((response) => {
					log(response)
					return response
				}).catch((err) => {
					log(err)
					return err
				})
		} catch (err) {
			log(err)
			return err
		} 
	},

	updatePassword = async (curPassword, newPassword) => {
		try {
			const me = await restApi.get("/me")
			log(me.data.user.email)
			return await restApi
				.post("/authenticate", {
					email: me.data.user.email,
					password: curPassword
				}) .then(async (response) => {
					log(response)
					if (response?.data.status === "success") {
						log(me.data.user.id)
						return await restApi
							.put("/updatepassword/"+me.data.user.id, {
								password: newPassword
							}).then((response) => {
								log(response)
								return response
							}).catch((err) => {
								log(err)
								return err
							})
					} else if (response.data.status === 'error') {
						return response.data.message
					}
				}).catch((err) => {
					log(err)
					return err
				})
		} catch (err) {
			log(err)
			return err
		} 
	},

	logout = () => {
		if (localStorage.clear() && sessionStorage.clear()) {
			log("Storage items successfully removed.")
		}
	},

	authService = {
		register, login, isUser, me, forgotPw, resetPw, updateUsername, updateEmail, updatePassword, logout
	}

export default authService
