import { useState } from "react"
import { Link } from 'react-router-dom'
import authService from '../api/authService'

const log = val => console.log(val)

const Register = () => {

   const
      [name, setName] = useState('jimmydoe'),
      [email, setEmail] = useState('jimmy@doe.com'),
      [password, setPassword] = useState('jimmy123'),
      [confirmPassword, setConfirmPassword] = useState('jimmy123'),
      [registered, setRegistered] = useState(false),

      [errMsg, setErrMsg] = useState(''),
      [succMsg, setSuccMsg] = useState(''),

      handleRegister = async e => {
         e.preventDefault()
         if (password === confirmPassword) {
            try {
               const signingUp = await authService.register(name, email, password)
               log(signingUp)
               if (signingUp.request.status === 200 && signingUp.data?.status === 'success') {
                  setSuccMsg('Registration was successful.')
                  setRegistered(true)
               }
               else if (signingUp.request.status === 422) {
                  setErrMsg('Mail address already in use.')
               } else {
                  setErrMsg('Something else is wrong.')
               }
            } catch (error) {
               log(error)
               setErrMsg('An unexpected error has occured.')
            }
         } else {
            setErrMsg('Confirmed password does not match.')
         }
      }

   return (
      <>
         <h4 className="text-2xl pb-4">Register</h4>
         { !registered ? <p>Please register to log in.</p> : <br/> }<br />
         { !registered ? 
            <form onSubmit={handleRegister}>
               <p style={{ color: errMsg ? 'red' : succMsg ? 'green' : 'black' }}>{errMsg || succMsg}<br /></p><br />
               <input type="text" id="username"
                  onChange={(e) => setName(e.target.value)} value={name}
                  required /><br /> { /* johndoe*/}
               <input type="email" id="email"
                  onChange={(e) => setEmail(e.target.value)} value={email}
                  required /><br /> { /* john@doe.com*/}
               <input type="password" id="password"
                  onChange={(e) => setPassword(e.target.value)} value={password}
                  required /><br />  { /* john123 */}
               <input type="password" id="password_confirm"
                  onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}
                  required /><br />
               <button className="bg-red-500 py-1 px-2 mt-4 hover:bg-red-400" id="submit">Sign Up</button>
            </form>
         : 
            <>
               <p>Your registration was successful.</p> <br />
               <p>➤ You can now proceed to <Link className="text-red-500 hover:underline" to="/login">log in</Link></p>
            </>
         }
      </>
   )
}

export default Register