import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  function submit(e) {
    e.preventDefault()
    
  }

  return (
    <div className="App">
      <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main >
        <Footer />
    </div>
  )
}

export default App
