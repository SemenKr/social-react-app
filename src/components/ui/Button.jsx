import React from 'react';
import style from './Button.module.css';

const Button = (props) => {
	return (
		<button onClick={this.handleClick} className={style.btn} > {props.title}{props.icon}</button >
	)
}

export default Button;