// authService

import axios from 'axios'
import betterLog from './betterLog'

const 
   API_BASE_URL = 'http://localhost:8000/api',
   LOCAL_STORED_USER = 'mb-user',
   LOCAL_STORED_EMAIL = LOCAL_STORED_USER+'-email',
   SESSION_USER_TOKEN = LOCAL_STORED_USER+'-token',

   log = msg => new betterLog({ 
      debug: true, 
      import: import.meta.url 
   }).log(msg)

// axios.defaults.withCredentials = true

const 
   restApi = axios.create({
      baseURL: API_BASE_URL,
      withCredentials: false,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'PUT,POST,DELETE,GET,OPTIONS',
         'Access-Control-Allow-Headers': 'Origin,Accept,Authorization,Content-Type,Set-Cookie',
         'Accept': 'application/json'
      }
   }),

   register = async (name, email, password) => {
      return await restApi.post('/register', { name, email, password })
         .then(response => {
            log(response)
            if (response.data.authorisation.token) {
               sessionStorage.setItem(SESSION_USER_TOKEN, JSON.stringify(response.data.authorisation.token))
            }
            return response
         }).catch(err => {
            log(err)
            return err
         })
   },

   login = async (email, password) => {
      return await restApi.post('/login', { email, password })
         .then(response => {
            log(response)
            if (response.data.authorisation.token) {
               localStorage.setItem(LOCAL_STORED_USER, JSON.stringify(response.data.user.name))
               localStorage.setItem(LOCAL_STORED_EMAIL, JSON.stringify(response.data.user.email))
               sessionStorage.setItem(SESSION_USER_TOKEN, JSON.stringify(response.data.authorisation.token))
            }
            return response
         }).catch(err => {
            log(err)
            return err
         })
   },

   isUser = () => JSON.parse(localStorage.getItem(LOCAL_STORED_USER)),

   forgotPw = async email => {
      // const param = new URLSearchParams()
      // param.append('email', email)
      return await restApi.post('/forgot-password', { email })
         .then(response => {
            //if (response.data.authorisation.token) {}
            log(response)
            return response
         }).catch(err => {
            log(err)
            return err
         })
   },

   resetPw = async (token, email, password, password_confirmation) => {
      return await restApi.post('/reset-password', { token: token, email: email, password: password, password_confirmation: password_confirmation })
         .then(response => {
            log(response)
            /*if (response.data.authorisation.token) {
               sessionStorage.setItem(SESSION_USER_TOKEN, JSON.stringify(response.data.authorisation.token))
            }*/
            return response
         }).catch(err => {
            log(err)
            return err
         })
   },

   //refresh = () => {},

   logout = () => {
      localStorage.clear() && sessionStorage.clear()
      if (!localStorage.getItem(LOCAL_STORED_USER) && !localStorage.getItem(LOCAL_STORED_EMAIL)) 
         log('Storage items successfully removed.') 
   },

   authService = {
      register, login, isUser, forgotPw, resetPw, logout 
   }

export default authService