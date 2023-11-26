import { createContext, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthContextProvider = ({children})=>{
    const[loggedIn,setLoggedIn]=useState(false)

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
    }

    const logout = ()=>{
        setLoggedIn(false)
        localStorage.removeItem("token")
    }

    useEffect(()=>{  
        const storedToken = localStorage.getItem('token'); 
        if(storedToken){
            if(isTokenExpired(storedToken)){
                logout()
            }else{
                setLoggedIn(true)
            }
        }
    },[])

    return(
        <AuthContext.Provider value={{loggedIn,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext,AuthContextProvider};