import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Index from './components/Index'
import Login from './components/Login'
import Nav from './components/Nav'
import Reg from './components/Reg'
import Email from './components/Email'
function App() {

  return (
    <>
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path="/Index" element={<Index/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Reg" element={<Reg/>}/>
        <Route path="/Email" element={<Email/>}/>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App