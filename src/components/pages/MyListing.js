import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import LostItems from './LostItems';
import FoundItems from './FoundItems';
import Toast from 'react-bootstrap/Toast';
import { jwtDecode } from "jwt-decode";
import { fetchLostItems } from './../../utils/lostItemUtils';
import { markItemAsFound } from './../services/foundItemService'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MyListing.css'

const MyListing = ({ lostItems, setLostItems, lostLoading, setLostLoading, foundItems, setFoundItems, setFoundLoading, foundLoading}) => {

  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  }

  useEffect(() => {

    setLostItems([]);
    // Fetch lost items for the current user when the component mounts
    fetchLostItems(setLostLoading, setLostItems);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  // Get the current user's ID from your authToken 
  const authToken = localStorage.getItem('Authorization');
  const decodedToken = jwtDecode(authToken);
  const currentUserId = decodedToken.userId; // Adjust this based on your implementation
  // Filter lost items based on the current user
  const userLostItems = lostItems.filter((item) => item.user === currentUserId);


  const shouldDisplayToast = localStorage.getItem('userId') === currentUserId;
  // const isMyListingUserEqualToLostItemUser = 
    // Function to handle the "YES" button click in the toast(Adding logic to update the status of the item to "found" on the backend)
    const handleToastYesClick = async () => {
      
      // Filter lost items based on the current user and displayTitle

      // get the displayTitle from the localStorage
      const displayTitle = localStorage.getItem("displayTitle");

      const markFoundItem = lostItems.filter((item) => item.title === displayTitle);
      
      if(markFoundItem.length > 0){
        const itemId = markFoundItem[0]._id; 
        try{
          // Call the function to mark the item as found
          const markAsFoundResult = await markItemAsFound(itemId);
          if(markAsFoundResult.success){
  
          
            // Update the local state with the new found items
            await fetchLostItems(setLostLoading, setLostItems);
  
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

    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

  return (
    <div>
      <div className="lost-items-block">
        {/* Display Lost Items */}
        <LostItems
          setLostItems={setLostItems}
          setLostLoading={setLostLoading}
          lostItems={userLostItems}
          lostLoading={lostLoading}
          // Pass an additional prop to indicate that this is the MyListing component
          isMyListing={true}
        />
      </div>

      {/* Display Found Items */}
      {/* <FoundItems /* Similar to LostItems component */ /*/> */}
      <div className="found-items-block">
        <FoundItems
          setFoundItems={setFoundItems}
          setFoundLoading={setFoundLoading}
          foundItems={userLostItems}
          foundLoading={foundLoading}
        />
      </div>

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

      {scrollY > 0 && (
        <Button
          variant='secondary'
          className='scroll-to-top-button-myListing'
          onClick={handleScrollToTop}
        >
          &#9650;
        </Button>
      )}
      
    </div>
  );
}

export default MyListing;
