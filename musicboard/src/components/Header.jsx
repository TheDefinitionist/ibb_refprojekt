import { Link } from "react-router-dom"

const Header = () => {
   return (
      <header>
         <div>
            <Link to="/" className="home">
               <img className="logo" src="assets/img/logo.svg" alt="MusicBoard Logo" title="MusicBoard" />
               <h1 className="">MusicBoard</h1>
            </Link>
            <nav>
               <ul id="navbar">
                  <li><Link to="/charts">CHARTS</Link></li>
                  <li><Link to="/music">MUSIC</Link></li>
                  <li><Link to="/culture">CULTURE</Link></li>
                  <li><Link to="/media">MEDIA</Link></li>
               </ul>
            </nav>
            <Link className="login" to="/login">Login</Link> |
            <Link className="register" to="/register">Register</Link>
            <button onClick={()=> alert('hi')}>
               <i className="fa-solid fa-crown"></i>&nbsp;PREMIUM
            </button>
         </div>
      </header>
   )
}

export default Header