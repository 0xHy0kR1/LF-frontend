import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useLocation} from "react-router-dom";
import NavbarComponent from "./components/common/NavbarComponent"; // Correct import path
import Home from "./components/pages/Home";
import "./index.css";
// import Signup from "./components/authentication/Signup";
// import Login from "./components/authentication/Login";
// import LostItems from "./components/pages/LostItems";
// import FoundItems from "./components/pages/FoundItems";
// import MyListing from "./components/pages/MyListing.js";
import { fetchLostItems } from "./utils/lostItemUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import Footer from "./components/common/Footer";
import Portfolio from "./components/pages/Portfolio";
import Contact from "./components/pages/Contact";

function App() {
  const [lostItems, setLostItems] = useState([]);
  const [lostLoading, setLostLoading] = useState(false);
  const [foundLoading, setFoundLoading] = useState(false);
  const [foundItems, setFoundItems] = useState([]);
  const [burgerClicked, setBurgerClicked] = useState(false);

  const location = useLocation();
  const handleBurgerClick = () => {
    setBurgerClicked(!burgerClicked);
  };

  const closeBurgerMenu = () => {
    setBurgerClicked(false);
  };


  // Fetch lost items function
  const handleFetchLostItems = async () => {
    // Call fetchLostItems and pass setLoading, setLostItems, and showAlert
    await fetchLostItems(setLostLoading, setLostItems);
  };

  useEffect(() =>{
    
    // Check token expiration on mount
    checkTokenExpiration();
  }, []);

  const checkTokenExpiration = () => {
    const authToken = localStorage.getItem('Authorization');

    if(authToken) {

      try{
        const decodedToken = jwtDecode(authToken); 
        const currentTime = Date.now()/1000;

        console.log("token expiry time", decodedToken.exp);
        console.log("Current time: " + currentTime)
        if(decodedToken.exp < currentTime) {
          window.location.href = '/login'
        }
      } catch(error){
        console.error('Error decoding JWT:', error);
      }
    }
  }

  return (
    <motion.div
    initial={{ opacity: 0, y: "-100vh" }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: "100vh" }}
    transition={{
      delay: 0.3,
      duration: 2,
      type: 'spring',
      damping: 10,   
      stiffness: 100 
    }}
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
              <AnimatePresence >
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
              </AnimatePresence>
          </>

        )}
        <Footer />
      </motion.div>      
  );
}

export default App;
