// authService

import axios from "axios"
import betterLog from "./betterLog"

const API_BASE_URL = "http://localhost:8000/api",
	LOCAL_USER = "mb-user",
	LOCAL_EMAIL = LOCAL_USER + "-email",
	LOCAL_TOKEN = LOCAL_USER + "-token",
	LOCAL_REGDATE = LOCAL_USER + "-regdate",
	LOCAL_DARKMODE = "mb-darkmode",
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
console.log({localStorage})
const register = async (name, email, password) => {
		return await restApi
			.post("/register", { name, email, password })
			.then((response) => {
				log(response)
				return response
			})
			.catch((err) => {
				log(err)
				return err
			})
	},
	login = async (email, password) => {
		return await restApi
			.post("/login", { email, password })
			.then((response) => {
				log(response)
				if (response.data.authorization.token) {
					localStorage.setItem(LOCAL_TOKEN, JSON.stringify(response.data.authorization.token))
					localStorage.setItem(LOCAL_USER, JSON.stringify(response.data.user.name))
					localStorage.setItem(LOCAL_EMAIL, JSON.stringify(response.data.user.email))
					localStorage.setItem(LOCAL_REGDATE, JSON.stringify(response.data.user.created_at))
				}
				return response
			})
			.catch((err) => {
				log(err)
				return err
			})
	},
	isUser = () => JSON.parse(localStorage.getItem(LOCAL_USER)),
	me = async () => {
		return await restApi
			.get("/me")
			.then((response) => {
				log(response)
				if (response.data.status === "success") {
					localStorage.setItem(LOCAL_USER, JSON.stringify(response.data.user.name))
					localStorage.setItem(LOCAL_EMAIL, JSON.stringify(response.data.user.email))
					localStorage.setItem(LOCAL_REGDATE, JSON.stringify(response.data.user.created_at))
				}
				return response
			})
			.catch((err) => {
				log(err)
				return err
			})
	},
	forgotPw = async (email) => {
		return await restApi
			.post("/forgot-password", { email })
			.then((response) => {
				log(response)
				return response
			})
			.catch((err) => {
				log(err)
				return err
			})
	},
	resetPw = async (token, email, password, password_confirmation) => {
		return await restApi
			.post("/reset-password", {
				token: token,
				email: email,
				password: password,
				password_confirmation: password_confirmation,
			})
			.then((response) => {
				log(response)
				return response
			})
			.catch((err) => {
				log(err)
				return err
			})
	},
	//refresh = () => {},

	logout = () => {
		localStorage.clear() && sessionStorage.clear()
		if (!localStorage.getItem(LOCAL_USER) && !localStorage.getItem(LOCAL_EMAIL) && !localStorage.getItem(LOCAL_REGDATE)) log("Storage items successfully removed.")
	},
	authService = {
		register,
		login,
		isUser,
		me,
		forgotPw,
		resetPw,
		logout,
	}

export default authService
