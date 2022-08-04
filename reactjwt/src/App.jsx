import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {

  function submit(e) {
    e.preventDefault()
    
  }

  return (
    <div className="App">
      <h3>Login</h3>
      <form onSubmit={submit}>
        <input type="text" id="email" value="john@doe.com" /><br />
        <input type="password" id="password" value="john123" /><br />
        <input type="button" id="submit" value="Login" />
      </form>
    </div>
  )
}

export default App
