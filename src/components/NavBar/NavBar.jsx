import React from 'react';
import nav from './NavBar.module.css';
import NavMenuItem from './NavMenu/NavMenu';



const NavBar = (props) => {


	const links = props.state.navMenu.links.map(link => <li><NavMenuItem name={link.name} path={link.path} /></li>)

	return (
		<nav className={`${nav.app__navigation} ${nav.navigation}`}>
			<ul>
				{links}
			</ul>
		</nav>
	);
};

export default NavBar;
