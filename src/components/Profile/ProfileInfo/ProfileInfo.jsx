import React from "react";
import p from './ProfileInfo.module.scss';
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png";
import userBG from "../../../assets/images/user-bg.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, updateStatus, status, isOwner, savePhoto}) => {

	if (!profile) {
		return <Preloader />
	}

	const onMainPhotoSelected = (e) => {

		if (e.target.files?.length) {
			savePhoto(e.target.files[0])
		}
		console.log(e.target.files[0]);

	}


	return (
		<div className={p.info}>
			<div className={p.info__top}>
				<img src={userBG} alt={"avatar"} />
			</div>
			<div className={p.info__content}>
				<div className={p.info__imageWrapper}>
					<img className={p.info__image} src={profile.photos.large !== null ? profile.photos.large : userPhoto} alt="yo" />
				</div>
				{isOwner && <div className={p.info__loadWrapper}>

						<input type={"file"}  onChange={onMainPhotoSelected} id="myFile" name="myfile" />


				</div>}
				<ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
				<p>{profile.fullName}</p>
				<p>{profile.lookingForAJobDescription}</p>
				<p className={p.info__description}>{profile.aboutMe}</p>
			</div>
		</div>
	)
}

export default ProfileInfo;
