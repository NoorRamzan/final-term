import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

import Navbar from './Navbar'
import CreateNote from './CreateNote';

function App() {
  return (
    
   
    <Router>
       <Navbar />
      <Routes>
       
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/CreateNote" element={<CreateNote />} />
        
       
        

      
      </Routes>
    </Router>
  );
}

export default App;
