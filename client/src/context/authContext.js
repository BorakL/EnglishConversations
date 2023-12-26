import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthContextProvider = ({children})=>{
    const[loggedIn,setLoggedIn]=useState(false)
    const[user,setUser]=useState(null)

    const isTokenExpired = (token)=>{
        const decodedToken = jwtDecode(token);
        if(!decodedToken.exp){
            return false;
        }
        const expirationTime = decodedToken.exp * 1000;
        return Date.now() >= expirationTime;
    }

    const login = (token)=>{
        setLoggedIn(true)
        localStorage.setItem("token",token)
        const decodedToken = jwtDecode(token);
        setUser(decodedToken.user)
    }

    const logout = ()=>{
        setLoggedIn(false)
        setUser(null)
        localStorage.removeItem("token")
    }

    useMemo(()=>{ 
        const storedToken = localStorage.getItem('token'); 
        if(storedToken){
            if(isTokenExpired(storedToken)){
                logout()
            }else{
                setLoggedIn(true)
                const decodedToken = jwtDecode(storedToken);
                setUser(decodedToken.user);
            }
        }
    },[])

    return(
        <AuthContext.Provider value={{loggedIn,login,logout,user}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext,AuthContextProvider};