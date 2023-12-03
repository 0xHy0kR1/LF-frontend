// lostItemUtils.js
import { getLostItems } from './../components/services/lostItemService'; // Import the actual service function

export const fetchLostItems = async (setLoading, setLostItems, showAlert) => {
  try {
    setLoading(true); // Set loading to true when fetching starts

    // Simulate a delay (e.g., 1 second) before fetching data
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await getLostItems(); // Adjust this based on your actual API call
    const items = response.lostItems; // Access the lostItems property
    setLostItems(items);

    setLoading(false); // Set loading to false when fetching is complete
  } catch (error) {
    console.error('Error fetching lost items:', error);
    showAlert('danger', 'Error fetching lost items');
    setLoading(false); // Make sure to set loading to false in case of an error
  }
};
