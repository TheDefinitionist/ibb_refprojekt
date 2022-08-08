import axios from 'axios'

const 
   BASE_API_URL = 'http://localhost:8000/api',
   LOCAL_STORED_USER = 'mb-user',
   SESSION_USER_TOKEN = LOCAL_STORED_USER+'-token',
   
   login = async (email, password) => {
      return await axios.post(BASE_API_URL+'/login', {
         email, password
      })
      .then((response) => {
         console.log(response.data)
         if (response.data.authorisation.token) {
            localStorage.setItem(LOCAL_STORED_USER, JSON.stringify(response.data.user.name))
            sessionStorage.setItem(SESSION_USER_TOKEN, JSON.stringify(response.data.authorisation.token))
         }
         return response.data
      })
   },

   isUser = () => {
      return JSON.parse(localStorage.getItem(LOCAL_STORED_USER))
   },

   logout = () => {
      localStorage.removeItem(LOCAL_STORED_USER)
      sessionStorage.removeItem(SESSION_USER_TOKEN)
   },

   authService = {
      login, isUser, logout
   }

export default authService