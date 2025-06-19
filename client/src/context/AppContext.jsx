// import { createContext,useState } from "react";
// export const AppContext=createContext()
// const AppContextProvider=(props)=>{
//      const [user,setUser]=useState(null);
//      const[showLogin,setShowLogin]=useState(false);
//      const value={
//         user,setUser,showLogin,setShowLogin
//      }
//      return(
//         <AppContext.Provider value={value}>
//             {props.children}

//         </AppContext.Provider>
//      )
// }
// export default AppContextProvider


// import React, { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const AppContext = createContext();

// const AppContextProvider = (props) => {
//     // The user state will now hold an object with user details, including their role
//     const [user, setUser] = useState(null); 
//     const [showLogin, setShowLogin] = useState(false);
    
//     // In a real app, you might have a loading state
//     // const [loading, setLoading] = useState(false);

//     // This is a placeholder for a real login function that would call your API
//     const login = (email, password) => {
//         // --- API call would happen here ---

//         // Based on the API response, we set the user.
//         // For this example, we'll just mock a user object.
//         // Let's pretend the API returns that this user is a 'receiver'.
//         const loggedInUser = {
//             email: email,
//             name: "Community Shelter", // Name from the database
//             role: "receiver" // <-- The crucial part!
//         };
//         setUser(loggedInUser);
//         return loggedInUser; // Return the user object for redirection
//     };
    
//     const logout = () => {
//         setUser(null);
//         // You would also clear any tokens here
//     };

//     const value = {
//         user,
//         setUser, // We'll use this to set the user after signup
//         showLogin,
//         setShowLogin,
//         login, 
//         logout
//     };
    
//     return (
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>
//     );
// };

// export default AppContextProvider;


// import React, { createContext, useState, useEffect } from "react";
// import axios from 'axios'; // Import axios

// export const AppContext = createContext();

// const AppContextProvider = (props) => {
//     // Define the base URL for your backend API
//     const url = "http://localhost:4000"; 
    
//     const [user, setUser] = useState(null); // Will hold user info later if needed
//     const [token, setToken] = useState(null);
//     const [showLogin, setShowLogin] = useState(false);
    
//     // This effect runs when the app first loads
//     useEffect(() => {
//         const loadUserFromToken = async () => {
//             const storedToken = localStorage.getItem("token");
//             if (storedToken) {
//                 setToken(storedToken);
//                 // You could add another API call here to get user data from the token
//                 // For now, just setting the token is enough to know the user is logged in
//             }
//         };
//         loadUserFromToken();
//     }, []);

//     const value = {
//         user,
//         setUser,
//         token,
//         setToken,
//         showLogin,
//         setShowLogin,
//         url, // Make the URL available to other components
//     };
    
//     return (
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>
//     );
// };

// export default AppContextProvider;



import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    // Define the base URL for your backend API
    const url = "http://localhost:4000"; 
    
    const [user, setUser] = useState(null); // This can be used later to store user details
    const [token, setToken] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    
    // This effect runs when the app first loads to check for a stored token
    useEffect(() => {
        const loadUserFromToken = async () => {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                // In a real app, you might add an API call here to get user data from the token
            }
        };
        loadUserFromToken();
    }, []);

    const value = {
        user,
        setUser,
        token,
        setToken,
        showLogin,
        setShowLogin,
        url, // Make the URL available to other components
    };
    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
