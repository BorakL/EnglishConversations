import React, { useContext } from "react"
import { AuthContext } from '../../context/authContext';
import Button from "../../components/button/button";

const UserProfile = ()=>{
    const{loggedIn,login,logout,user} = useContext(AuthContext)
    console.log("user",user)
    return(
        <div className="user-profile-page page-wrapper">
            <div className="user-profile-page-header header-title">
                <h1>{user.name}</h1>
            </div>
            <p>{user.email}</p>
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