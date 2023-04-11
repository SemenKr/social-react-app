/** @format */

import React from 'react';
import h from './Header.module.css';

const Header = () => {
   return (
      <header className={h.header}>
         <img
            className={h.header__image}
            src="https://img.logoipsum.com/244.png"
            width={'150'}
            height={'40'}
            alt="logo"
         />
      </header>
   );
};

export default Header;
