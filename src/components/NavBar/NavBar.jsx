/** @format */

import React from 'react';
import nav from './NavBar.module.css';

const NavBar = () => {
   return (
      <nav className={`${nav.app__navigation} ${nav.navigation}`}>
         <ul>
            <li>
               <a href="#"></a>Profile
            </li>
            <li>
               <a href="#"></a>Messages
            </li>
            <li>
               <a href="#"></a>Any
            </li>
            <li>
               <a href="#"></a>settings
            </li>
         </ul>
      </nav>
   );
};

export default NavBar;
