const authHeader = () => {
   const user = JSON.parse(localStorage.getItem('mb-user'))

   if (user && user.authorisation.token) {
      return { Authorization: 'Bearer ' + user.authorisation.token }
      // return { "x-auth-token" : user.authorisation.token }
   } else {
      return {}
   }
}

export default authHeader