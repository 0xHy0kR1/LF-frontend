import { getFoundItems } from './../components/services/foundItemService'; // Import the actual service function

export const fetchFoundItems = async (setFoundLoading, setFoundItems) => {
  try {
    setFoundLoading(true); // Set loading to true when fetching starts

    // Simulate a delay (0.5 second) before fetching data
    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await getFoundItems(); // Adjust this based on your actual API call
    const items = response.lostItems; // Access the lostItems property
    setFoundItems(items);

    setFoundLoading(false); // Set loading to false when fetching is complete
  } catch (error) {
    console.error('Error fetching lost items:', error);
    setFoundLoading(false); // Make sure to set loading to false in case of an error
  }
};
