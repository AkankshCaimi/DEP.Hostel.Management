import React, {useContext, useState, useEffect} from "react";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const backendUrl = process.env.REACT_APP_BASE_URL;
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [shouldRunEffect, setShouldRunEffect] = useState(true);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/api/login`, {
            email: email,
            password: password
            }, {
            withCredentials: true
            });
            
            setCurrentUser(response.data.data);
            setLoading(false);
            return response.data;
        } catch (error) {
            // Handle login error
            console.error('Login failed:', error);
            setLoading(false);
            throw error;  // Propagate the error
        }
    };      
    const signup= ()=>{

    }
    const logout = ()=>{

    }
    useEffect(()=>{
        const unsubscribe =()=>{
            if(!currentUser){
                setLoading(true);
                axios.get(`${backendUrl}/api/user`, {withCredentials: true})
                .then((res) => {
                    if(res.data.data){
                        // console.log(res.data)
                        setCurrentUser(res.data.data)
                    }else{
                        // console.log('No user logged in')
                        setCurrentUser(null)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
                setLoading(false);
            }
        }
        return unsubscribe;
    }, []) 
    const value = {
        currentUser,
        setCurrentUser,
        signup,
        login,
        logout,
      };
    
      return (
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
      );
}