import React from "react";
import p from './ProfileInfo.module.scss';
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png";
import userBG from "../../../assets/images/user-bg.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, updateStatus, status}) => {

	if (!profile) {
		return <Preloader />
	}
	return (
		<div className={p.info}>
			<div className={p.info__top}>
				<img src={profile.photos.large !== null ? profile.photos.large : userBG} alt={"avatar"} />
			</div>
			<div className={p.info__content}>
				<div className={p.info__imageWrapper}>
					<img className={p.info__image} src={profile.photos.small !== null ? profile.photos.small : userPhoto} alt="yo" />
				</div>
				<ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
				<p>{profile.fullName}</p>
				<p>{profile.lookingForAJobDescription}</p>
				<p className={p.info__description}>{profile.aboutMe}</p>
			</div>
		</div>
	)
}

export default ProfileInfo;
