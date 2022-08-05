import { Navigate, Link } from 'react-router-dom'

const Logout = ({ loggedOut }) => {

   const loggedOutMsg = <p>You have been logged out.</p>

   return (
      <>
         { !loggedOut && <Navigate msg={loggedOutMsg} replace to="/" /> }
         <h4 className="text-2xl pb-4">Logout</h4>
         <p>You have been logged out.</p><br />
         <p>➤ Back to <Link className="text-red-500 hover:underline" to="/">Home</Link></p>
      </>
   )
}

export default Logout