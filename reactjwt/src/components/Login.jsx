const Login = ({loggedIn, setLoggedIn}) => {

   const submit = (e) => {
		e.preventDefault()
		
	}

   return (
      <>
         <h4 className="text-2xl pb-4">Login</h4>
         <form onSubmit={submit}>
            <input type="text" id="email" defaultValue="john@doe.com" /><br />
            <input type="password" id="password" defaultValue="john123" /><br />
            <button onClick={() => { setLoggedIn(true) }} className="bg-red-500 py-1 px-2 hover:bg-red-400" id="submit">Login</button>
         </form>
      </>
   )
}

export default Login