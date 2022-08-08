import { useState } from "react"
import authService from '../api/authService'

const Register = () => {

   const 
      [name, setName] = useState('jimmydoe'),
      [email, setEmail] = useState('jimmy@doe.com'),
      [password, setPassword] = useState('jimmy123'),
      [confirmPassword, setConfirmPassword] = useState('jimmy123'),

      [errMsg, setErrMsg] = useState(''),
      [succMsg, setSuccMsg] = useState(''),

      handleRegister = async (e) => {
         e.preventDefault()
         if (password === confirmPassword) {
            try {
               await authService.register(name, email, password)
               setSuccMsg('Registration was successful.')
            } catch (err) {
               console.log(err)
               setErrMsg(err)
            }
         } else {
            setErrMsg('Confirmed password does not match.')
         }
      }

   return (
      <>
         <h4 className="text-2xl pb-4">Register</h4>
         <p>Please register to log in.</p><br />
         <form onSubmit={ handleRegister }>
            <p style={{color: errMsg ? 'red' : succMsg ? 'green' : 'black'}}>{errMsg || succMsg}<br /></p><br />
            <input type="text" id="username" 
               onChange={ (e) => setName(e.target.value)} value={name} 
            required /><br /> { /* johndoe*/}
            <input type="email" id="email" 
               onChange={ (e) => setEmail(e.target.value)} value={email} 
            required /><br /> { /* john@doe.com*/}
            <input type="password" id="password" 
               onChange={ (e) => setPassword(e.target.value)} value={password} 
            required /><br />  { /* john123 */}
            <input type="password" id="password_confirm" 
               onChange={ (e) => setConfirmPassword(e.target.value)} value={confirmPassword} 
            required /><br />
            <button className="bg-red-500 py-1 px-2 mt-4 hover:bg-red-400" id="submit">Sign Up</button>
         </form>
      </>
   )
}

export default Register