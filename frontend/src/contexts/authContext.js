import React, {useContext, useState, useEffect} from "react";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(false);

    const login =async (email, password) => {
        return new Promise((resolve, reject)=>{
            axios.post('http://localhost:8000/api/login', {
                email: email,
                password: password
            }, {
                withCredentials: true
            }).then((response) => {
                console.log('here:', response.data.message);
                console.log('here:', response.data.data);
                setCurrentUser(response.data.email)
                setLoading(false)
                resolve(response)
            })
            .catch((err) => {
                reject(err);
            })
        })
    }
    const signup= ()=>{

    }
    const logout = ()=>{

    }
    const value = {
        currentUser,
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