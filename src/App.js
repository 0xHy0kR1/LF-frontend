import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/common/NavbarComponent"; // Correct import path
import Home from "./components/pages/Home";
import "./index.css";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
// import Alert from './components/common/Alert'
import LostItems from "./components/pages/LostItems";
import FoundItems from "./components/pages/FoundItems";
import MyListing from "./components/pages/MyListing.js";
import { fetchLostItems } from "./utils/lostItemUtils";
import { fetchFoundItems } from "./utils/foundItemUtils.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
// import ItemDetails from './components/pages/ItemDetails';
// import Footer from './components/common/Footer';

function App() {
  const [lostItems, setLostItems] = useState([]);
  const [lostLoading, setLostLoading] = useState(false);
  const [foundLoading, setFoundLoading] = useState(false);
  const [foundItems, setFoundItems] = useState([]);
  const [burgerClicked, setBurgerClicked] = useState(false);

  const handleBurgerClick = () => {
    setBurgerClicked(!burgerClicked);
  };

  const closeBurgerMenu = () => {
    setBurgerClicked(false);
    console.log("burgerClicked --> ", burgerClicked);
  };

  // Function to show an alert
  // This function now directly uses toast.success, toast.error, etc., based on the type.
  const showAlert = (type, message) => {
    toast[type](message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  // Fetch lost items function
  const handleFetchLostItems = async () => {
    // Call fetchLostItems and pass setLoading, setLostItems, and showAlert
    await fetchLostItems(setLostLoading, setLostItems);
  };

  return (
    <BrowserRouter>
    <motion.div
        initial={{ opacity: 0, y: "-100vh" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100vh" }}
        transition={{ delay: 0.3, duration:2, type: 'spring'}}
      >
          <NavbarComponent
            lostItems={lostItems}
            setLostItems={setLostItems}
            lostLoading={lostLoading}
            fetchLostItems={handleFetchLostItems}
            burgerClicked={burgerClicked}
            closeBurgerMenu={closeBurgerMenu}
            handleBurgerClick={handleBurgerClick}
          />
        {!burgerClicked && (
          <>
            {/* <Alert alert={alert} /> */}
            <ToastContainer position="top-right" autoClose={2000} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Login" element={<Login />} />
              <Route
                path="/lost"
                element={
                  <LostItems
                    setLostItems={setLostItems}
                    setLostLoading={setLostLoading}
                    lostItems={lostItems}
                    lostLoading={lostLoading}
                  />
                }
              />
              <Route
                path="/found"
                element={
                  <FoundItems
                    setFoundItems={setFoundItems}
                    setFoundLoading={setFoundLoading}
                    foundItems={foundItems}
                    foundLoading={foundLoading}
                  />
                }
              />
              <Route
                path="/my-listing"
                element={
                  <MyListing
                    setLostItems={setLostItems}
                    setFoundItems={setFoundItems}
                    setLostLoading={setLostLoading}
                    setFoundLoading={setFoundLoading}
                    lostItems={lostItems}
                    foundItems={foundItems}
                    lostLoading={lostLoading}
                    foundLoading={foundLoading}
                  />
                }
              />
              {/* <Route path="/item/:id" element={<ItemDetails />} /> */}
            </Routes>
          {/* <Footer /> */}
          </>
        )}
      </motion.div>      
    </BrowserRouter>
  );
}

export default App;
