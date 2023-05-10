import React from "react";
import styles from './users.module.scss';
import axios from 'axios';



const Users = (props) => {
	if (props.users.length === 0) {


		axios.get("https://social-network.samuraijs.com/api/1.0/users")
			.then(response => {
				debugger
				props.SetUsers();
			})

		// props.setUsers([
		// 	{
		// 		id: 1,
		// 		followed: true,
		// 		fullName: 'Antonina',
		// 		status: 'smart fitness in my life',
		// 		location: {city: 'SPB', country: 'russia'},
		// 		src: 'https://i.pravatar.cc/150?img=1',
		// 	},
		// 	{
		// 		id: 2,
		// 		followed: true,
		// 		fullName: 'Andrew',
		// 		status: 'hard work',
		// 		location: {city: 'SPB', country: 'russia'},
		// 		src: 'https://i.pravatar.cc/150?img=2',
		// 	},
		// 	{
		// 		id: 3,
		// 		followed: false,
		// 		fullName: 'Nadin',
		// 		status: 'design in my life',
		// 		location: {city: 'SPB', country: 'russia'},
		// 		src: 'https://i.pravatar.cc/150?img=6',
		// 	},
		// 	{
		// 		id: 4,
		// 		followed: false,
		// 		fullName: 'Alena',
		// 		status: 'style',
		// 		location: {city: 'SPB', country: 'russia'},
		// 		src: 'https://i.pravatar.cc/150?img=11',
		// 	},
		// ]
		// )
	}


	return <>
		<h3>Users</h3>
		<ul className={styles.users}>
			{
				props.users.map(user => <li className={styles.userCard} key={user.id}>
					<div className={styles.userCard__top}></div>
					<div className={styles.userCard__bottom}>
						<div className={styles.imageWrapper}><img className={styles.image} src={user.src} alt="" /></div>
						<div className="about">
							<p className="name">{user.fullName}</p>
							<p className="name">{user.status}</p>

						</div>
						<div className={styles.p}>
							<div className={styles.p}>
								<p className={styles.p}>{user.location.country}</p>
								<p className={styles.p}>{user.location.city}</p>
							</div>
							{user.followed
								? <button onClick={() => {
									props.unfollow(user.id)
								}} className={styles.p}>Unfollow</button>
								: <button onClick={() => {
									props.follow(user.id)
								}} className={styles.p}>Follow</button>}

						</div>

					</div>
				</li>)
			}
		</ul>

	</>
}

export default Users;