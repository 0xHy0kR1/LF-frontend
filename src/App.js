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
import MyListing from './components/pages/MyListing.js';
import { fetchLostItems } from './utils/lostItemUtils';
// import ItemDetails from './components/pages/ItemDetails';
// import Footer from './components/common/Footer';

function App() {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(false);
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

  // Fetch lost items function
  const handleFetchLostItems = async () => {
    // Call fetchLostItems and pass setLoading, setLostItems, and showAlert
    await fetchLostItems(setLoading, setLostItems, showAlert);
  };

  return (
    <BrowserRouter>
      <NavbarComponent showAlert={showAlert} lostItems={lostItems} setLostItems={setLostItems} loading={loading} fetchLostItems={handleFetchLostItems} />
      <Alert alert={alert} />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/Signup" element={<Signup showAlert={showAlert} />} /> 
          <Route path="/Login" element={<Login showAlert={showAlert} />} />
          <Route path="/lost" element={<LostItems showAlert={showAlert} setLostItems={setLostItems} setLoading={setLoading} lostItems={lostItems} loading={loading} />} />
          <Route path="/my-listing" element={<MyListing showAlert={showAlert} setLostItems={setLostItems} setLoading={setLoading} lostItems={lostItems} loading={loading} />} />
          {/* <Route path="/item/:id" element={<ItemDetails />} /> */}
        </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
