import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import authService from '../api/authService'

const Login = ({ loggedIn, setLoggedIn }) => {

   const
      loc = useLocation().pathname === '/login',

      [email, setEmail] = useState(''),
      [password, setPassword] = useState(''),

      [errMsg, setErrMsg] = useState(''),
      [succMsg, setSuccMsg] = useState(''),

      handleLogin = e => {
         e.preventDefault()
         authService.login(email, password, res => {
            console.log(res)
            if (res.status === 'success') {
               setLoggedIn(true)
               setSuccMsg('Login was successful.')
            } else if (res.request?.status === 401) setErrMsg('Wrong mail address or password.')
            else {
               setErrMsg('Authorization has failed.')
               setLoggedIn(false)
            }
         })
      }

   return (
      <>
         {loc && <h4 className="text-2xl pb-4">Login</h4>}
         {loc && !loggedIn ? (
            <form onSubmit={handleLogin}>
               <p style={{ color: errMsg ? 'red' : succMsg ? 'green' : 'black' }}>{errMsg || succMsg}<br /></p><br />
               <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required /><br />
               <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required /><br />
               <button className="bg-red-500 py-1 px-2 mt-2 hover:bg-red-400" id="submit">Login</button>
            </form>
         ) : (
            <>
               {loc && <p>You successfully logged in!<br /></p>}
            </>
         )}
      </>
   )
}

export default Login