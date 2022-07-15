import { Link } from "react-router-dom"

const Header = () => {
   return (
      <header className="container mx-auto text-gray-600 px-6 max-w-l00 border-b-1 border-green">
         <div className="flex flex-wrap flex-col md:flex-row items-center m-4 pt-5">
            <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
               <img src="assets/img/logo.svg" className="w-12 h-12 text-white" alt="MusicBoard Logo" title="MusicBoard" />
               <h1 className="ml-3 text-xl title">MusicBoard</h1>
            </Link>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
               <ul id="navbar" className="flex flext-start">
                  <li><Link to="/charts" className="mr-5 tracking-widest hover:bg-gray-200 hover:text-red-700 p-4">CHARTS</Link></li>
                  <li><Link to="/music" className="mr-5 tracking-widest hover:bg-gray-200 hover:text-red-700 p-4">MUSIC</Link></li>
                  <li><Link to="/culture" className="mr-5 tracking-widest hover:bg-gray-200 hover:text-red-700 p-4">CULTURE</Link></li>
                  <li><Link to="/media" className="mr-5 tracking-widest hover:bg-gray-200 hover:text-red-700 p-4">MEDIA</Link></li>
               </ul>
            </nav>
            <Link to="/login" className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 text-base mt-4 md:mt-0">Login</Link> |
            <Link to="/register" className="font-bold text-red-500 p-2 focus:outline-none hover:text-black">Register</Link>
            <button className="cta-red focus:outline-none" onClick={()=> alert('hi')}>
               <i className="fa-solid fa-crown"></i>PREMIUM
            </button>
         </div>
      </header>
   )
}

export default Header