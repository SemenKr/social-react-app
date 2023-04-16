import React from 'react';
import nav from './NavBar.module.css';
import NavMenuItem from './NavMenu/NavMenu';


const NavBar = (props) => {

	// const links = props.state.links.map(link => <li><NavMenuItem link={link.name} /></li>)

	return (
		<nav className={`${nav.app__navigation} ${nav.navigation}`}>
			<ul>
				{/* <li><NavMenuItem name={props.state[0].name} /></li> */}
			</ul>
		</nav>
	);
};

export default NavBar;
