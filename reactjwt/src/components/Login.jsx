import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import authService from '../api/authService'

const Login = ({ loggedIn, setLoggedIn }) => {

   const 
      loc = useLocation().pathname === '/login',

      [email, setEmail] = useState(''),
      [password, setPassword] = useState(''),

      handleLogin = async (e) => {
         e.preventDefault()

         try {
            await authService.login(email, password)
            setLoggedIn(true)
         } catch (error) {
            console.error(error)
         }
      }

   return (
      <>
         { loc && <h4 className="text-2xl pb-4">Login</h4> }
         { loc && !loggedIn ? (
            <form onSubmit={handleLogin}>
               <input type="email" id="email" onChange={ (e) => setEmail(e.target.value)} value={email} /><br />
               <input type="password" id="password" onChange={ (e) => setPassword(e.target.value)} value={password} /><br />
               <button className="bg-red-500 py-1 px-2 mt-2 hover:bg-red-400" id="submit">Login</button>
            </form>
         ) : ( 
            <>
               { loc && <p>You successfully logged in!<br /></p> }
            </>
         )}
      </>
   )
}

export default Login