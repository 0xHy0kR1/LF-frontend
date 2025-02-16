const authDataString = localStorage.getItem("kt-auth-react-v");
      if (!authDataString) {
        throw new Error("User authentication data not found in localStorage");
      }

      const authData = JSON.parse(authDataString);
      const token = authData?.api_token;

      if (!token) {
        throw new Error("User token not found in authentication data");
      }