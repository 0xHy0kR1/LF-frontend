// lostItemUtils.js
import { getLostItems } from './../components/services/lostItemService'; // Import the actual service function

export const fetchLostItems = async (setLostLoading, setLostItems) => {
  try {
    setLostLoading(true); // Set loading to true when fetching starts

    // Simulate a delay (0.5 second) before fetching data
    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await getLostItems(); // Adjust this based on your actual API call
    const items = response.lostItems; // Access the lostItems property
    setLostItems(items);

    setLostLoading(false); // Set loading to false when fetching is complete
  } catch (error) {
    console.error('Error fetching lost items:', error);
    setLostLoading(false); // Make sure to set loading to false in case of an error
  }
};
