import React from "react";
import styles from './users.module.css';

const Users = (props) => {

    return <>
        <h3>Users</h3>
        <ul className={styles.users}>
            {
                props.users.map(user => <li  className={styles.userCard} key={user.id}>
                    <div className={styles.userCard__top}></div>
                    <div className={styles.userCard__bottom}>
                        <div className={styles.imageWrapper}><img className={styles.image} src={user.src} alt=""/></div>
                        <div className="about">
                            <p className="name">{user.fullName}</p>
                            <p className="name">{user.status}</p>

                        </div>
                        <div className={styles.p}>
                            <div className={styles.p}>
                                <p className={styles.p}>{user.location.country}</p>
                                <p className={styles.p}>{user.location.city}</p>
                            </div>
                            { user.followed
                                ? <button onClick={() => {props.unfollow(user.id)}} className={styles.p}>Unfollow</button>
                                : <button onClick={() => {props.follow(user.id)}} className={styles.p}>Follow</button> }

                        </div>

                    </div>
                </li>)
            }
        </ul>
  
    </>
}

export default Users;