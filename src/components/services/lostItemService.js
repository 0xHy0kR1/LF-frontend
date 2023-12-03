// Define the base URL for your API
const BASE_URL = 'http://localhost:5000/api/lost-items';

const authToken = localStorage.getItem('authToken');
// Function to create a new lost item
export const createLostItem = async (data) => {
    console.log(data);
    try{

        // Create a FormData object to handle the file upload
        const formData = new FormData();
        formData.append('image', data.get("image")); // Assuming your file input field is named 'image'
        formData.append('title', data.get("title"));
        formData.append('description', data.get("description"));
        formData.append('category', data.get("category"));
        formData.append('location', data.get("location"));
        formData.append('securityQuestion', data.get("securityQuestion"));

        const response = await fetch(`${BASE_URL}/create`, {
            method: 'POST',
            headers: {
                authToken: authToken, // Including the authentication token in the header
            },
            body: formData,
        });

        if(response.ok){
            return {success: true, message: 'Item created successfully'};
        } else{
            console.log("inside else");
            return {success: false, message: 'Item creation failed'};
        }
    } catch(error){
        console.log("inside catch");
        return {success: false, message: 'Item creation failed'};
    }
}

// Function to get a list of all lost items
export const getLostItems = async () => {
    try{
        
        const response = await fetch(`${BASE_URL}/list-lostItems`);
        const data = await response.json();

        if(response.ok){
            return { success: true, message: 'Item retrieved successfully', lostItems: data.lostItems};
        } else{
            return { success: false, message: 'Failed to retrieve lost items'};
        }
    } catch(error){
        return { success: false, message: 'Failed to retrieve lost items'};
    }
}

// Function to update a specific lost item
export const updateLostItem = async (itemId, data) => {
    try{

        // Create a FormData object to handle the file upload
        const formData = new FormData();
        console.log("Title value: "+data.get("title"));
        formData.append('image', data.get("image")); // Assuming your file input field is named 'image'
        formData.append('title', data.get("title"));
        formData.append('description', data.get("description"));
        formData.append('category', data.get("category"));
        formData.append('location', data.get("location"));
        formData.append('securityQuestion', data.get("securityQuestion"));

        console.log("Inside lostItemService updateLostItem function");
        console.log("data value inside updateLostItem: "+JSON.stringify(data));
        console.log("data value inside updateLostItem: "+data);
        const response = await fetch(`${BASE_URL}/update/${itemId}`,{
            method: 'PUT',
            headers: {
                authToken: authToken, // Include the authentication token in the header
            },
            body: formData,
        });

        console.log("response value inside updateLostItem: "+ JSON.stringify(response));
        if(response.ok){
            return { success: true, message: 'Lost item updated successfully' };
        } else{
            return { success: false, message: 'Failed to update the lost item' };
        }
    } catch(error){
        return { success: false, message: 'Failed to update the lost item' };
    }
}

// Function to delete the lost item
export const deleteLostItem = async (itemId) => {
    try{
        console.log("Inside lostItemService: ");
        const response = await fetch(`${BASE_URL}/delete/${itemId}`,{
            method: 'DELETE',
            headers: {
                authToken: authToken, // Include the authentication token in the header
            }
        });
        console.log("Before response ok: ");
        if(response.ok){
            return { success: true, message: 'Lost item deleted successfully'};
        } else{
            return { success: false, message: 'Failed to delete the lost item'};
        }

    } catch(error){
        return { success: false, message: 'Failed to delete the lost item'};
    }
}

// Function to view a specific lost item
export const viewLostItem = async (itemId) => {
    try{
        const response = await fetch(`${BASE_URL}/view/${itemId}`,{
            headers: {
                authToken: authToken, // Include the authentication token in the header
            },
        });

        if(response.ok) {
            const responseData = await response.json();
            return { success: true, message: 'Lost item retrieved successfully', data: responseData };
        } else{
            return { success: false, message: 'Failed to retrieve the lost item'};
        }
    } catch(error){
        return { success: false, message: 'Failed to retrieve the lost item'};
    }
}

// Function to submit the answer to the security question for a specific lost item
export const answerSecurityQuestion = async (itemId, data) => {
    try{
        const response = await fetch(`${BASE_URL}/answerSecurityQuestion/${itemId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if(response.ok){
            const responseData = await response.json();
            return { success: true, message: 'Incorrect answer', data: responseData };
        } else {
            return { success: false, message: 'Incorrect answer'};
        }
    } catch (error){
        return { success: false, message: 'Failed to submit the answer'}
    }
}
