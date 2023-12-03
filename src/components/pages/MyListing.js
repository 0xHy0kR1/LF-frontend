import React, { useState, useEffect } from 'react';
import LostItems from './LostItems'; // You may need to adjust the import path
import FoundItems from './FoundItems'; // You may need to adjust the import path
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import { jwtDecode } from "jwt-decode";
import { fetchLostItems } from './../../utils/lostItemUtils';
import { markItemAsFound } from './../services/foundItemService'; // Import the actual service function
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MyListing.css'

const MyListing = ({ showAlert, lostItems, setLostItems, loading, setLoading, foundItems, setFoundItems}) => {

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

  // Get the current user's ID from your authToken 
  const authToken = localStorage.getItem('authToken');
  const decodedToken = jwtDecode(authToken);
  console.log("decoded token value: ",decodedToken);
  const currentUserId = decodedToken.userId; // Adjust this based on your implementation
  console.log("current user id: ",currentUserId);
  // Filter lost items based on the current user
  console.log("item value: ",lostItems);
  const userLostItems = lostItems.filter((item) => item.user === currentUserId);

  console.log("userLostItems value: ", userLostItems)

  const shouldDisplayToast = localStorage.getItem('userId') === currentUserId;
  // const isMyListingUserEqualToLostItemUser = 
    // Function to handle the "YES" button click in the toast(Adding logic to update the status of the item to "found" on the backend)
    const handleToastYesClick = async () => {
      
      console.log("inside handleToastYesClick");
      // Filter lost items based on the current user and displayTitle
      console.log("currentUserId value: " + currentUserId);

      // get the displayTitle from the localStorage
      const displayTitle = localStorage.getItem("displayTitle");

      const markFoundItem = lostItems.filter((item) => item.title === displayTitle);
      console.log("markFoundItem value: " + JSON.stringify(markFoundItem))
      console.log("markFoundItem object value: " + markFoundItem);
      
      if(markFoundItem.length > 0){
        const itemId = markFoundItem[0]._id; 
        console.log("itemId value: " + itemId);
        try{
          // Call the function to mark the item as found
          const markAsFoundResult = await markItemAsFound(itemId);
          console.log("markAsFoundResult value: " + JSON.stringify(markAsFoundResult));
          if(markAsFoundResult.success){
  
          
            // Update the local state with the new found items
            await fetchLostItems(setLoading, setLostItems, showAlert);
  
            // Display a success message using toast
            toast.success(markAsFoundResult.message);
            
            // Remove displayTitle from localStorage
            localStorage.removeItem('displayTitle');

            // Hide the toast(Persist the state in localStorage)
            localStorage.setItem('securityQuestionAnswered', 'false');
          } else{
            // Handle the case where marking the item as found failed
            console.error(markAsFoundResult.message);
            toast.error('Failed to mark the item as found. Try to refresh the page');
          }
        } catch (error){
          // Handling any unexpected errors
          console.error('Failed to mark the item as found: ', error);
          toast.error('Failed to mark the item as found. Try to refresh the page');
        }
      };
    }
  return (
    <div>

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
      {/* <FoundItems /* Similar to LostItems component */ /*/> */}
      <FoundItems
        setFoundItems={setFoundItems}
        setLoading={setLoading}
        foundItems={userLostItems}
        loading={loading}
        // Pass an additional prop to indicate that this is the MyListing component
        isMyListing={true}
      />

      {/* Toast for "Did you get the item" */}
      <div className="toast-container">
        <Toast show={(localStorage.getItem('securityQuestionAnswered') === 'true') && shouldDisplayToast} className="toast">
          <Toast.Header closeButton={false}>
            <strong>Did you get the {localStorage.getItem('displayTitle')}?</strong>
          </Toast.Header>
          <Toast.Body>
            <Button variant='success' onClick={handleToastYesClick}>
              YES
            </Button>
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
}

export default MyListing;
