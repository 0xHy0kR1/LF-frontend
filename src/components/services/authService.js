// Function to send Credential for signup
const registerUser = async (userData) => {
    try{
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })

        if(response.ok){
            return { success: true, message: 'User registration successful'};
        } else{
            return { success: false, message: 'User registration failed'};
        }
    } catch(error){
        return { success: false, message: 'User registration failed'};
    }
};

const loginUser = async (userData) => {
    try{
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if(response.ok){
            const result = await response.json();
            return { success: true, message: 'Login successful', token: result.token };
        } else{
            return { success: false, message: 'Login failed' };
        }
    } catch(error){
        console.error('Error ', error);
        return { success: false, message: 'Login failed'};
    }
}

export default{
    registerUser,
    loginUser 
};