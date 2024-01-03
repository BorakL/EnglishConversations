import React, { useContext, useEffect } from "react"
import { AuthContext } from '../../context/authContext';
import Button from "../../components/button/button";
import { useNavigate } from "react-router";

const UserProfile = ()=>{
    const{loggedIn,login,logout,user} = useContext(AuthContext)
    const navigate = useNavigate(); 

    useEffect(()=>{
        if(!loggedIn){
            navigate("/login")
        }
    },[])
    
    return(
        <div className="user-profile-page page-wrapper">
            <div className="user-profile-page-header header-title">
                <h1>{user?.name}</h1>
            </div>
            <p>{user?.email}</p>
            <div>
                <Button
                    to="/" 
                    onClick={logout}
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default UserProfile