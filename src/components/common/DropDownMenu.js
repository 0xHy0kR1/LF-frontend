import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const dropDownVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

const DropDownMenu = ({ isOpen }) => {
  return (
    <motion.div
      variants={dropDownVariants}
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/lost" className="nav-link">
        Lost Items
      </Link>
      <Link to="/found" className="nav-link">
        Found Items
      </Link>
      {/* Add more links as needed */}
    </motion.div>
  );
};

export default DropDownMenu;
