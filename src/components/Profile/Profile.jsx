import React from 'react';
import p from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = () => {
    return (
        <div className={p.main_content}>
            Main Content
            <ProfileInfo/>
            <MyPosts/>
        </div>
    );
};

export default Profile;
