import React from 'react';
import styles from './users.module.scss';
import userPhoto from '../../assets/images/user.png'
import userBG from '../../assets/images/user-bg.jpg'
import {NavLink} from "react-router-dom";


let User = ({user, followingInProgress, unfollow, follow,}) => {

    return (
        <li className={styles.userCard} key={user.id}>
            <div className={styles.userCard__top}>
                <img src={user.photos.large !== null ? user.photos.large : userBG} alt=""/>
            </div>
            <div className={styles.userCard__bottom}>
                <NavLink to={'/profile/' + user.id}>
                    <div className={styles.imageWrapper}><img className={styles.image}
                                                              src={user.photos.small !== null ? user.photos.small : userPhoto}
                                                              alt=""/></div>
                </NavLink>
                <div className="about">
                    <p className="name">{user.name}</p>
                    <p className="name">{user.status}</p>

                </div>
                <div className={styles.p}>
                    <div className={styles.p}>
                        {/*<p className={styles.p}>{"user.location.country"}</p>*/}
                        {/*<p className={styles.p}>{"user.location.city"}</p>*/}
                    </div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id)
                        }} className={styles.p}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id)
                        }} className={styles.p}>Follow</button>}
                </div>

            </div>
        </li>)
};

export default User;