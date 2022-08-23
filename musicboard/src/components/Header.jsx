// Header

import { Link, useLocation } from 'react-router-dom'
import authService from '../utilities/authService'


const Header = ({ loggedIn, setLoggedIn, logo }) => {

   const handleLogout = () => {
      setLoggedIn(false)
      authService.logout()
   }

   const
      username = JSON.parse(localStorage.getItem('mb-user')),
      location = useLocation().pathname,
      active = (path = '') => location === `/${path}` ?
         { "style": { "color": "red" } } :
         { "className": "hover:text-red-500 items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 text-base" }

   return (
      <header>
         <div className="header-wrapper">
            <Link to="/" id="home">
               <img className="logo" src={logo} alt="MusicBoard Logo" title="MusicBoard" />
               <h1>MusicBoard</h1>
            </Link>
            <nav>
               <ul id="navbar">
                  <li><Link to="/charts" {...active('charts')}>CHARTS</Link></li>
                  <li><Link to="/music" {...active('music')}>MUSIC</Link></li>
                  <li><Link to="/culture" {...active('culture')}>CULTURE</Link></li>
                  <li><Link to="/media" {...active('media')}>MEDIA</Link></li>
               </ul>
            </nav>
            { loggedIn ?
               <>
                  <div>
                     { username && <>Welcome, <span className="text-red-500 font-bold"> {username}</span>!&nbsp; |</> }
                  </div>
                  <Link className="account" to="/account" {...active('account')}>Account</Link>|
                  <Link className="logout" to="/" onClick={handleLogout} {...active('logout')}>Logout</Link>
               </> :
               <>
                  <Link className="login" to="/login" {...active('login')}>Login</Link>|
                  <Link className="register" to="/register" {...active('register')}>Register</Link>
               </>
            }
            <button className="subscribe" onClick={() => alert('hi')}>
               <i className="fa-solid fa-crown"></i>&nbsp;PREMIUM
            </button>
         </div>
      </header>
   )
}

export default Header