import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/common/NavbarComponent'; // Correct import path
import Home from './components/pages/Home';
import './index.css'
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';
// import LostItems from './components/pages/LostItems';
// import FoundItems from './components/pages/FoundItems';
// import ItemDetails from './components/pages/ItemDetails';
// import Footer from './components/common/Footer';

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          {/* <Route path="/lost" element={<LostItems />} /> */}
          {/* <Route path="/found" element={<FoundItems />} /> */}
          {/* <Route path="/item/:id" element={<ItemDetails />} /> */}
        </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
