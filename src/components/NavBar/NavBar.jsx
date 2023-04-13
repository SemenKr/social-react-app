import React from 'react';
import nav from './NavBar.module.css';
import {NavLink} from "react-router-dom";

const NavBar = () => {
   return (
      <nav className={`${nav.app__navigation} ${nav.navigation}`}>
         <ul>
            <li>
               <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
               <NavLink to="/messages">Messages</NavLink>
            </li>
            <li>
               <NavLink to="/news">News</NavLink>
            </li>
            <li>
               <NavLink to="/music">Music</NavLink>
            </li>
         </ul>
      </nav>
   );
};

export default NavBar;
