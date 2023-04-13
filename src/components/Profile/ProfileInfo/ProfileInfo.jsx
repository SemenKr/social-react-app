import React from "react";
import p from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
	return (
		<div className={p.info}>
			<div className={p.info__imageWrapper}>
				<img className={p.info__image} src="./img/photo-sam.jpg" alt="yo" />
			</div>

			<p className={p.info__description}>{props.description}</p>
		</div>
	)
}

export default ProfileInfo;