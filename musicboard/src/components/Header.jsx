const Header = () => {
   return (
      <header className="container mx-auto text-gray-600 px-6 max-w-l00">
         <div className="flex flex-wrap flex-col md:flex-row items-center">
            <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
               <img src="assets/img/logo.svg" className="w-12 h-12 text-white" alt="MusicBoard Logo" title="MusicBoard" />
               <h1 className="ml-3 text-xl title">MusicBoard</h1>
            </a>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
               <ul id="navbar" className="flex flext-start">
                  <li><a href="/news" className="mr-5 tracking-widest hover:text-gray-900">NEWS</a></li>
                  <li><a href="/news" className="mr-5 tracking-widest hover:text-gray-900">MUSIC</a></li>
                  <li><a href="/news" className="mr-5 tracking-widest hover:text-gray-900">CULTURE</a></li>
                  <li><a href="/news" className="mr-5 tracking-widest hover:text-gray-900">MEDIA</a></li>
               </ul>
            </nav>
            <a href="/" className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 text-base mt-4 md:mt-0">Login</a> |
            <a href="/" className="inline-flex items-center border-0 py-1 px-3 bg-gray-100 focus:outline-none hover:bg-gray-200 text-base mt-4 md:mt-0">Register</a> |
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
               <i className="fa-solid fa-crown"></i>PREMIUM
            </button>
         </div>
      </header>
   )
}

export default Header