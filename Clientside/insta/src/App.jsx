import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Index from './components/Index'
import Login from './components/Login'
import Reg from './components/Reg'
import Email from './components/Email'
import Profile from './components/Profile'
function App() {

  return (
    <>
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path="/" element={<Index/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/reg" element={<Reg/>}></Route>
        <Route path='/email' element={<Email/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App