import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    
    const url = "https://food4good-new.onrender.com"; 
    
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    
    
    useEffect(() => {
        const loadUserFromToken = async () => {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                
            }
            setLoading(false);
            
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
        url, 
        loading,
    };
    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
