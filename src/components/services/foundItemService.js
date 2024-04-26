import { baseURL } from "../../URL";
// Define the base URL for your API
const BASE_URL = `${baseURL}/api/lost-items`;

const authToken = localStorage.getItem('Authorization');

// Function to fetch found items from the backend

// Function to send request to backend to mark the item as found
export const markItemAsFound = async (itemId) => {
    try{
        const response = await fetch(`${BASE_URL}/markAsFound/${itemId}`, {
            method: 'PUT', 
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        
        if(response.ok){
            const data = await response.json(); // Parse the response as JSON

            return { success: true, message: data.message };
        } else{
            // Handle the case where the response is not successful
            return { success: false, message: 'Failed to mark the item as found' };
        }
        
    } catch(error){
        // Handle any network or other errors
        return { success: false, message: 'Failed to mark the item as found' };
    }
}

// Function to get a list of all found items
export const getFoundItems = async () => {
    try{
        
        const response = await fetch(`${BASE_URL}/list-foundItems`);
        const data = await response.json();
        if(response.ok){
            return { success: true, message: 'Found items retrieved successfully', lostItems: data.lostItems};
        } else{
            return { success: false, message: 'Failed to retrieve found items'};
        }
    } catch(error){
        return { success: false, message: 'Failed to retrieve found items'};
    }
}
