import { isPromise } from 'util/types'
import axios from 'axios'

const 
   LOCAL_STORED_USER = 'mb-user',
   SESSION_USER_TOKEN = LOCAL_STORED_USER+'-token',

   restApi = axios.create({
      baseURL: 'http://localhost:8000/api'
   }),

   debug = false,

   register = async (name, email, password) => {
      return await restApi.post(BASE_API_URL+'/register', {
         name, email,password
      })
      .then((response) => {
         if (debug) console.log(response.data)
         if (response.data.authorisation.token) {
            localStorage.setItem(LOCAL_STORED_USER, JSON.stringify(response.data.user.name))
            sessionStorage.setItem(SESSION_USER_TOKEN, JSON.stringify(response.data.authorisation.token))
         }
         return response.data
      })
      .catch(err => {
         console.log(err)
         return err
      })
   },
   
   login = async (email, password, res) => {
      console.log(isPromise(restApi))
      return;
      return await restApi.post('/login', {email, password})
         .then((response) => {
            if (response.data.authorisation.token) {
               localStorage.setItem(LOCAL_STORED_USER, JSON.stringify(response.data.user.name))
               sessionStorage.setItem(SESSION_USER_TOKEN, JSON.stringify(response.data.authorisation.token))
            }
            res(response.data)
         }).catch(err => res(err))
   },

   isUser = () => {
      if (debug) console.log('isUser: ', JSON.parse(localStorage.getItem(LOCAL_STORED_USER)))
      return JSON.parse(localStorage.getItem(LOCAL_STORED_USER))
   },

   refresh = () => {},

   logout = () => {
      localStorage.removeItem(LOCAL_STORED_USER), sessionStorage.clear()
      if (debug && !localStorage.getItem(LOCAL_STORED_USER)) console.log('Storage items successfully removed.') 
   },

   authService = {
      register, login, isUser, logout
   }

export default authService