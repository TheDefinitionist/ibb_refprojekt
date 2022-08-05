const Register = ({setRegistered}) => {
   return (
      <>
         <h4 className="text-2xl pb-4">Register</h4>
         <p>Please register to log in.</p>
         <br />
         <form>
            <input type="text" id="username" defaultValue="John Doe" /><br />
            <input type="email" id="email" defaultValue="john@doe.com" /><br />
            <input type="password" id="password" defaultValue="john123" /><br />
            <input type="password" id="password_confirm" defaultValue="john123" /><br />
            <button onClick={() => { setRegistered(true) }} className="bg-red-500 py-1 px-2 mt-4 hover:bg-red-400" id="submit">Sign Up</button>
         </form>
      </>
   )
}

export default Register