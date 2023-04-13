import React from 'react';
import p from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';

const Profile = () => {
    return (
        <div className={p.main_content}>
            Main Content
            <div>
                <img src={'https://picsum.photos/800/200?random=1?grayscale'}/>
            </div>
            <div>ava + descriptions</div>
            <MyPosts/>
        </div>
    );
};

export default Profile;
