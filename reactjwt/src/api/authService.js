import { isPromise } from '@analytics/type-utils'
import axios from 'axios'
import betterLog from './betterLog'

const 
   log = msg => new betterLog({ 
      debug: true, 
      import: import.meta.url 
   }).log(msg),
   LOCAL_STORED_USER = 'mb-user',
   SESSION_USER_TOKEN = LOCAL_STORED_USER+'-token',

   restApi = axios.create({
      baseURL: 'http://localhost:8000/api'
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
               sessionStorage.setItem(SESSION_USER_TOKEN, JSON.stringify(response.data.authorisation.token))
            }
            return response
         }).catch(err => {
            log(err)
            return err
         })
   },

   isUser = () => JSON.parse(localStorage.getItem(LOCAL_STORED_USER)),

   refresh = () => {},

   logout = () => {
      localStorage.clear(), sessionStorage.clear()
      if (!localStorage.getItem(LOCAL_STORED_USER)) log('Storage items successfully removed.') 
   },

   authService = {
      register, login, isUser, logout
   }

export default authService