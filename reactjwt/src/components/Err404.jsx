import { Link } from 'react-router-dom'

const Err404 = () => {
   return (
      <>
         <h4 className="text-2xl pb-4">Error 404</h4>
         <p>The page you are looking for cannot be found.</p> <br />
         <p>➤ Back to <Link className="text-red-500 hover:underline" to="/">Home</Link></p>
      </>
   )
}

export default Err404