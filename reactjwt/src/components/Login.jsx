import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { isPromise } from '@analytics/type-utils'
import authService from '../api/authService'

const Login = ({ loggedIn, setLoggedIn }) => {

   const
      loc = useLocation().pathname === '/login',

      [email, setEmail] = useState(''),
      [password, setPassword] = useState(''),

      [errMsg, setErrMsg] = useState(''),
      [succMsg, setSuccMsg] = useState(''),

      handleLogin = async e => {
         e.preventDefault()
         try {
            const response = await authService.login(email, password)
            console.log(response)
            if (response.request.status === 200 && response.data.status === 'success') {
               setLoggedIn(true)
               setSuccMsg('Login was successful.')
            } else {
               setLoggedIn(false)
               if (response.request.status === 401) setErrMsg('Wrong mail address or password.')
               else setErrMsg('Authorization has failed.')
            }
         } catch (error) {
            setLoggedIn(false)
            console.log(error)
         }
      }

   return (
      <>
         { loc && <h4 className="text-2xl pb-4">Login</h4> }
         { loc && !loggedIn ? (
            <form onSubmit={handleLogin}>
               <p style={{ color: 'red' }}>{errMsg}<br /></p><br />
               <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required /><br />
               <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required /><br />
               <button className="bg-red-500 py-1 px-2 mt-2 hover:bg-red-400" id="submit">Login</button>
            </form>
         ) : (
            <>
               { loc && <p style={{ color: 'green' }}>{succMsg}<br /></p> }
            </>
         )}
      </>
   )
}

export default Login