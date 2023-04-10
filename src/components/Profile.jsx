/** @format */

import React from 'react';
import p from './Profile.module.css';

const Profile = () => {
   return (
      <div className={p.main_content}>
         Main Content
         <div>
            <img src={'https://picsum.photos/800/200?random=1?grayscale'} />
         </div>
         <div>ava + descriptions</div>
         <div>New Post</div>
         <ul>
            <li>Post 1</li>
            <li>Post 2</li>
            <li>Post 3</li>
         </ul>
      </div>
   );
};

export default Profile;
