// AuthProvider

// import { createContext, useState } from 'react'

// const AuthContext = createContext({})

// export const AuthProvider = ({ children }) => {
//    const [auth, setAuth] = useState({})
   
//    return <AuthContext.Provider value={{ auth, setAuth }}>
//       { children }
//    </AuthContext.Provider>
// }

// export default AuthContext

// -------------------------------

import { createContext, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
   const [ctxUsername, setCtxUsername] = useState(JSON.parse(localStorage.getItem('mb-user')) || false)
   const [ctxEmail, setCtxEmail] = useState(JSON.parse(localStorage.getItem('mb-user-email')) || false)
   
   return <AuthContext.Provider value={{ ctxUsername, setCtxUsername, ctxEmail, setCtxEmail }}>
      { children }
   </AuthContext.Provider>
}

export default AuthContext