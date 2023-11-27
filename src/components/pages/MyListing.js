import React, { useState, useEffect } from 'react';
import LostItems from './LostItems'; // You may need to adjust the import path
import FoundItems from './FoundItems'; // You may need to adjust the import path
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import { jwtDecode } from "jwt-decode";
import { fetchLostItems } from './../../utils/lostItemUtils';

const MyListing = ({ showAlert, lostItems, setLostItems, loading, setLoading }) => {

  useEffect(() => {
    // Fetch lost items for the current user when the component mounts
    const fetchData = async () => {
      try {
        await fetchLostItems(setLoading, setLostItems, showAlert);
      } catch (error) {
        // Handle any unexpected errors
        console.error('Error fetching lost items:', error);
      }
    };

    fetchData(); // Call the fetchData function to initiate the data fetching
  }, []);

  // Function to handle the "YES" button click in the toast
  const handleToastYesClick = () => {
    // Add logic to update the status of the item to "found" on the backend
    // Then, fetch and update the local state with the new found items
    // Display a success message using showAlert
  };

  // Get the current user's ID from your authToken 
  const authToken = localStorage.getItem('authToken');
  const decodedToken = jwtDecode(authToken);
  console.log("decoded token value: ",decodedToken);
  const currentUserId = decodedToken.userId; // Adjust this based on your implementation
  console.log("current user id: ",currentUserId);

  // Filter lost items based on the current user
  console.log("item value: ",lostItems);
  const userLostItems = lostItems.filter((item) => item.user === currentUserId);

  return (
    <div>
      <h2 className='text-center'>My Listings</h2>

      {/* Display Lost Items */}
      <LostItems
        setLostItems={setLostItems}
        setLoading={setLoading}
        lostItems={userLostItems}
        loading={loading}
        showAlert={showAlert}
        // Pass an additional prop to indicate that this is the MyListing component
        isMyListing={true}
      />

      {/* Display Found Items */}
      <h3>Found Items</h3>
      {/* <FoundItems /* Similar to LostItems component */ /*/> */}

      {/* Toast for "Did you get the item" */}
      <Toast /* Implement toast logic with 'handleToastYesClick' */>
        <Toast.Header closeButton={false}>
          <strong>Did you get the 'item name'?</strong>
        </Toast.Header>
        <Toast.Body>
          <Button variant='success' onClick={handleToastYesClick}>
            YES
          </Button>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default MyListing;
