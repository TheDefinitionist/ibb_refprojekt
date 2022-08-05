import { useLocation } from 'react-router-dom'

const Login = ({ loggedIn, setLoggedIn }) => {

   const 
      loc = useLocation().pathname === '/login',
      submit = e => e.preventDefault()

   return (
      <>
         { loc && <h4 className="text-2xl pb-4">Login</h4> }
         { loc && !loggedIn ? (
            <form onSubmit={submit}>
               <input type="email" id="email" defaultValue="john@doe.com" /><br />
               <input type="password" id="password" defaultValue="john123" /><br />
               <button onClick={() => { setLoggedIn(true) }} className="bg-red-500 py-1 px-2 mt-2 hover:bg-red-400" id="submit">Login</button>
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