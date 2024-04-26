import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavbarComponent.css";
import DarkMode from "./DarkMode/DarkMode";
import { Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PostItemModal from "../modal/PostItemModal";
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";

function NavbarComponent(props) {
  // State to manage modal visibility
  const [isToggled, setToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the user is logged in and the token is expired
    const authToken = localStorage.getItem("Authorization");
    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decodedToken.exp < currentTime) {
        // Token is expired, log out the user
        handleLogoutToHome();
      }
    }
  }, []);

  // Function to show the modal
  const handleModalShow = () => setShowModal(true);

  // Function to hide the modal
  const handleModalClose = () => setShowModal(false);

  // Check if the user is logged in (based on the presence of authToken)
  const isLoggedIn = !!localStorage.getItem("Authorization");

  const isLostPage = location.pathname === "/lost";

  const closeBurgerMenu = () => {
    setToggle(false);
    // If you want to notify the parent component about burger menu close,
    // you can call props.closeBurgerMenu here
    props.closeBurgerMenu();
    // You can pass additional information if needed, for example:
    // props.closeBurgerMenu('Burger menu closed');
  };

  const toggleBurgerButton = () => {
    setToggle(!isToggled);
    props.handleBurgerClick();
  };
  // Handle logout
  const handleLogout = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem("Authorization");

    // Redirect the user to the login page
    navigate("/login");
  };

  // Handle logout
  const handleLogoutToHome = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem("Authorization");

    // Redirect the user to the login page
    navigate("/");
  };

  const navList = {
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.07,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const navItem = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    hidden: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
  };

  const navContainer = {
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.07,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <>
      <button
        variant="primary"
        className={`btn-primary burger-button ${
          isToggled ? "black-bg" : "white-bg"
        }`}
        onClick={toggleBurgerButton}
      >
        =
      </button>
      <AnimatePresence>
        {isToggled && (
          <motion.div
            className="nav-block"
            variants={navContainer}
            initial="hidden"
            animate={isToggled ? "visible" : "hidden"}
            exit="hidden"
          >
            <Navbar className={`nav-cover`} data-bs-theme="dark">
              <Container fluid>
                {/* Mobile menu toggle button */}
                <motion.div
                  variants={navList}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className={`me-auto`}>
                    {/* Apply motion to each Link directly */}
                    <motion.div className="block-link" variants={navItem}>
                      <Link
                        to="/"
                        className="nav-link"
                        onClick={closeBurgerMenu}
                      >
                        Home
                      </Link>
                    </motion.div>
                    <motion.div className="block-link" variants={navItem}>
                      <Link
                        to="/lost"
                        className="nav-link"
                        onClick={closeBurgerMenu}
                      >
                        Lost Items
                      </Link>
                    </motion.div>
                    <motion.div className="block-link" variants={navItem}>
                      <Link
                        to="/found"
                        className="nav-link"
                        onClick={closeBurgerMenu}
                      >
                        Found Items
                      </Link>
                    </motion.div>
                    {isLoggedIn ? (
                      <motion.div className="block-link" variants={navItem}>
                        <Link
                          to="/my-listing"
                          className="nav-link"
                          onClick={closeBurgerMenu}
                        >
                          My Listing
                        </Link>
                      </motion.div>
                    ) : (
                      <>
                        <motion.div className="block-link" variants={navItem}>
                          <Link
                            to="/Signup"
                            className="nav-link"
                            onClick={closeBurgerMenu}
                          >
                            Sign Up
                          </Link>
                        </motion.div>
                        <motion.div className="block-link" variants={navItem}>
                          <Link
                            to="/Login"
                            className="nav-link"
                            onClick={closeBurgerMenu}
                          >
                            Login
                          </Link>
                        </motion.div>
                      </>
                    )}
                  </div>
                </motion.div>
              </Container>
            </Navbar>
          </motion.div>
        )}
      </AnimatePresence>
      {/* DarkMode component */}
      <div className="right-block">
        <div className="button-block">
        {isLostPage && isLoggedIn && (
          <>
            <PostItemModal
              showModal={showModal}
              handleModalShow={handleModalShow}
              handleModalClose={handleModalClose}
              fetchLostItems={props.fetchLostItems}
            />
            <Button
              variant="primary"
              className="post-item-button"
              onClick={handleModalShow}
            >
              Post Item
            </Button>
          </>
        )}
        {isLoggedIn && (
          <Button
            variant="danger"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
        </div>
          <DarkMode />
      </div>
    </>
  );
}

export default NavbarComponent;
