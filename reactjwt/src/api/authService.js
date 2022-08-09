import path from 'path-browserify'
import { isPromise } from '@analytics/type-utils'
import axios from 'axios'



//log('Hello, this is a text message in a ')

const 
   LOCAL_STORED_USER = 'mb-user',
   SESSION_USER_TOKEN = LOCAL_STORED_USER+'-token',

   restApi = axios.create({
      baseURL: 'http://localhost:8000/api'
   }),

   debug = true,
   log = msg => {
      return debug && (()=> {
         const filename = path.basename(import.meta.url).replace(/\?.+/, '')
         console.info('%c'+filename, 'padding:3px;color: lightblue; background-color: navy', msg)
      })()
   },

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