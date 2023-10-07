 import React, {useState} from "react";
import p from './ProfileInfo.module.scss';
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png";
import userBG from "../../../assets/images/user-bg.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({profile, updateStatus, status, isOwner, savePhoto, saveProfileData,}) => {

	const [editMode, setEditMode] = useState(false)

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

					<input type={"file"} onChange={onMainPhotoSelected} id="myFile" name="myfile" />


				</div>}

				<ProfileStatusWithHooks status={status} updateStatus={updateStatus} />

				{editMode
					? <ProfileDataForm profile={profile} saveProfileData={saveProfileData} setEditMode={setEditMode} />
					: <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)}} />}



			</div>
		</div>
	)
}



const ProfileData = ({profile, isOwner, goToEditMode}) => {

	return (
		<div>
			{isOwner && <button onClick={goToEditMode}>Редактировать</button>}
			<p>{profile.fullName}</p>
			<p className="">Looking for a job:  {profile.lookingForAJob ? " yes" : " no"}</p>
			{profile.lookingForAJob &&
				<p className="">My prof skills: {profile.lookingForAJobDescription}</p>
			}
			{profile.contacts &&
				<div>Contacts:
					<ul>
						{Object.keys(profile.contacts).map((key) => {
							return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
						})}

					</ul>
				</div>
			}
		</div>
	)
}


export const Contact = ({contactTitle, contactValue}) => {
	return (
		<li><span>{contactTitle}</span>: {contactValue}</li>
	)
}

export default ProfileInfo;
