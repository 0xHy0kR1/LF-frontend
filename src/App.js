import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/common/NavbarComponent'; // Correct import path
import Home from './components/pages/Home';
import './index.css'
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';
import Alert from './components/common/Alert'
import LostItems from './components/pages/LostItems';
import FoundItems from './components/pages/FoundItems';
// import ItemDetails from './components/pages/ItemDetails';
// import Footer from './components/common/Footer';

function App() {
  const [alert, setAlert] = useState(null);

  // Function to show an alert
  const showAlert = (type, message) => {
    setAlert({
      type: type,
      msg: message
    });
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Alert alert={alert} />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/Signup" element={<Signup showAlert={showAlert} />} /> // Pass showAlert function to Signup component
          <Route path="/Login" element={<Login showAlert={showAlert} />} />
          <Route path="/lost" element={<LostItems showAlert={showAlert} />} />
          <Route path="/found" element={<FoundItems />} />
          {/* <Route path="/item/:id" element={<ItemDetails />} /> */}
        </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
