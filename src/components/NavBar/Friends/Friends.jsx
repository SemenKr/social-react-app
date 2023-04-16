import React from 'react';
import s from './Friends.module.css';

const Friend = (props) => {
	return (
		<div className={s.friend}>
			<img className={s.friend__image} src={props.src} alt={props.alt} />
			<span className={s.friend__name}>{props.name}</span>
		</div>
	)
}

export default Friend;