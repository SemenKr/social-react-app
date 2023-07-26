import React from "react";
import p from './ProfileInfo.module.scss';
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png";
import userBG from "../../../assets/images/user-bg.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {

	if (!props.profile) {
		return <Preloader />
	}
	return (
		<div className={p.info}>
			<div className={p.info__top}>
				<img src={props.profile.photos.large !== null ? props.profile.photos.large : userBG} alt={"avatar"} />
			</div>
			<div className={p.info__content}>
				<div className={p.info__imageWrapper}>
					<img className={p.info__image} src={props.profile.photos.small !== null ? props.profile.photos.small : userPhoto} alt="yo" />
				</div>
				<ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
				<p>{props.profile.fullName}</p>
				<p>{props.profile.lookingForAJobDescription}</p>
				<p className={p.info__description}>{props.profile.aboutMe}</p>
			</div>
		</div>
	)
}

export default ProfileInfo;
