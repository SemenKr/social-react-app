import React from "react";
import {NavLink} from "react-router-dom";
import d from './DialogItem.module.css';

const DialogItem = (props) => {
	let path = '/messages/' + props.id;
	return (
		<li><NavLink className={d.contact} to={path}>{props.name}</NavLink></li>
	)
}

export default DialogItem;