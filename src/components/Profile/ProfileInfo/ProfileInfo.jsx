import React, { useState } from "react";
import p from './ProfileInfo.module.scss';
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png";
import userBG from "../../../assets/images/user-bg.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from './ProfileDataForm.tsx';
import {Button} from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});


const ProfileInfo = ({ profile, updateStatus, status, isOwner, savePhoto, saveProfileData }) => {
	const [editMode, setEditMode] = useState(false);

	const onMainPhotoSelected = (e) => {
		if (e.target.files?.length) {
			savePhoto(e.target.files[0]);
		}
	}

	if (!profile) {
		return <Preloader />
	}

	return (
		<div className={p.info}>
			<div className={p.info__top}>
				<img src={userBG} alt={"avatar"} />
			</div>
			<div className={p.info__content}>
				<div className={p.info__imageWrapper}>
					<img className={p.info__image} src={profile.photos.large || userPhoto} alt="yo" />
				</div>
				{isOwner && (
					<div className={p.info__loadWrapper}>
						{/* Input для загрузки фото */}
						<Button component="label" onChange={onMainPhotoSelected} id="myFile" name="myfile" variant="contained" startIcon={<CloudUploadIcon />}>
							Upload file
							<VisuallyHiddenInput type="file" />
						</Button>
					</div>
				)}

				<ProfileStatusWithHooks status={status} updateStatus={updateStatus} />

				{editMode
					? <ProfileDataForm profile={profile} saveProfileData={saveProfileData} setEditMode={setEditMode} />
					: <ProfileData profile={profile} isOwner={isOwner} setEditMode={setEditMode} />}
			</div>
		</div>
	)
}

const ProfileData = ({ profile, isOwner, setEditMode }) => {
	return (
		<div>
			{isOwner && <Button onClick={() => setEditMode(true)} variant="contained">Редактировать</Button>}
			<p>{profile.fullName}</p>
			<p className="">Looking for a job: {profile.lookingForAJob ? " yes" : " no"}</p>
			{profile.lookingForAJob &&
				<p className="">My prof skills: {profile.lookingForAJobDescription}</p>
			}
			{profile.contacts && (
				<div className={p.contacts}>
					Contacts:
					<ul>
						{Object.entries(profile.contacts)
							.filter(([_, value]) => value)
							.map(([key, value]) => (
								<li key={key}>
									{/* Отображение контактов */}
									<Contact contactTitle={key} contactValue={value} />
								</li>
							))}
					</ul>
				</div>
			)}
		</div>
	)
}

const Contact = ({ contactTitle, contactValue }) => {
	return (
		<span>
      <a
		  className={p.contactLink}
		  href={addPrefixToLink(contactTitle, contactValue)}
		  target="_blank"
		  rel="noopener noreferrer"
	  >
        {contactTitle}
      </a>
    </span>
	)
}

function addPrefixToLink(key, value) {
	// Префиксы для контактов
	const contactPrefixes = {
		github: "https://github.com/",
		vk: "https://vk.com/",
		// Добавьте другие контакты по аналогии
	};

	if (contactPrefixes.hasOwnProperty(key)) {
		// Если есть префикс для контакта, добавляем его к значению
		return contactPrefixes[key] + value;
	}

	// Возвращаем значение без изменений, если префикс не найден
	return value;
}

export default ProfileInfo;
