import React from 'react';
import { NavLink } from 'react-router-dom';

import './navLinks.scss';

const NavLinks = props => {
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact="true">ALL USERS</NavLink>
    </li>
    <li>
      <NavLink to="/topics">Topics</NavLink>
    </li>
    <li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li>
  </ul>
};

export default NavLinks;