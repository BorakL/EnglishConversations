import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './navLinks.scss';
import { AuthContext } from '../../context/authContext';
import { FaCircleUser } from "react-icons/fa6";

const NavLinks = props => {
  const{loggedIn,user}=useContext(AuthContext)

  return <ul className={`nav-links ${!props.drawerIsOpen ? "header-nav-links" : ""}`}>
    <li>
      <NavLink to="/create-conversation">Create</NavLink>
    </li>
    <li>
      <NavLink to="/topics">Topics</NavLink>
    </li>
    {
      !loggedIn ?
      <>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Signup</NavLink>
        </li>
      </>
      :
      <li>
        <NavLink to="/user-profile"><FaCircleUser/> {user?.username}</NavLink>
      </li>
    }
  </ul>
};

export default NavLinks;