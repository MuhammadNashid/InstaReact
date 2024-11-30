// src/Routes.jsx
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Index from './components/Login';
import Login from './components/Login';
import Reg from './components//Reg';
import Email from './components/Email';
import Fpass from './components/Fpass';

const App = () => {
  return (
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Reg />} />
        <Route path="/email" element={<Email />} />
        <Route path="/forgot-password" element={<Fpass />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


































// import React from 'react';
// import Login from './components/Login';
// import Index from './components/Index';

// import { BrowserRouter, Route, Routes } from 'react-router-dom'

// const App = () => {
//     return (
       
//            <BrowserRouter>
//            <Routes>
//               <Route path="/Login" element={<Login/>}/>
//               <Route path="/Index" element={<Index/>}/>
//            </Routes>
//            </BrowserRouter>
        
//     );
// };

// export default App;
