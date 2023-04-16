import React from 'react';
import {NavLink} from "react-router-dom";

const NavMenuItem = (props) => {
	return (
		<NavLink to="/profile">{props.name}</NavLink>
	)
}

// {props.state.links.name}
export default NavMenuItem;