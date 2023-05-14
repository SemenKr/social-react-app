import React from "react";
import p from './ProfileInfo.module.scss';
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = (props) => {

	if (!props.profile) {
		return <Preloader />
	}
	return (
		<div className={p.info}>
			<div className={p.info__top}>
				<img src={props.profile.photos.large} alt="" />
			</div>
			<div className={p.info__content}>
				<div className={p.info__imageWrapper}>
					<img className={p.info__image} src={props.profile.photos.small} alt="yo" />
				</div>

				<p className={p.info__description}>{props.profile.aboutMe}</p>
			</div>


		</div>
	)
}

export default ProfileInfo;