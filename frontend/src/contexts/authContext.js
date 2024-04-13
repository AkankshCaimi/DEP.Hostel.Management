import React, {useContext, useState, useEffect} from "react";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const backendUrl = process.env.REACT_APP_BASE_URL;
    const [currentUser, setCurrentUser] = useState(null);
    // const navigate=useNavigate();
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
        setLoading(true);
        axios.get(`${backendUrl}/api/logout`, {withCredentials: true})
        .then((res) => {
            console.log('inside logout', res.data)
            setCurrentUser(null)
            
        })
        .catch((err) => {
            console.error(err)
        })
        .finally(()=>{
            setLoading(false)
        })
    }
    const unsubscribe =async()=>{
        if(!currentUser){
            setLoading(true);
            axios.get(`${backendUrl}/api/get_user_info`, {withCredentials: true})
            .then((res) => {
                console.log('inside authContext useEffect', res.data.data)
                if(res.data.data){
                    // console.log(res.data)
                    setCurrentUser(res.data.data)
                }else{
                    // console.log('No user logged in')
                    setCurrentUser(null)
                }
            })
            .catch((err) => {
                console.error(err)
                setCurrentUser(null)
            })
            .finally(()=>{
                setLoading(false);
            })
            // setLoading(false);
        }
    }
    useEffect(()=>{
        return unsubscribe;
    }, []) 
    const value = {
        currentUser,
        setCurrentUser,
        signup,
        login,
        logout,
        loading,
      };
    
      return (
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
      );
}