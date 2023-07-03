import React from 'react';
import h from './Header.module.scss';
import {NavLink} from 'react-router-dom';

const Header = (props) => {
	return (
		<header className={h.header}>
			<img className={h.header__image}
				src="https://img.logoipsum.com/244.png"
				width={'150'}
				height={'40'}
				alt="logo" />

			<div className={`${h.header__login} ${h.login}`}>
				{props.isAuth
					? <div to={'/login'}>{props.login} - <button onClick={props.logout}>Log out</button></div >
					: <NavLink to={'/login'}>Login</NavLink >}

			</div>
		</header>
	);
};

export default Header;
