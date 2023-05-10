import React, {Component} from "react";
import styles from './users.module.scss';
import axios from 'axios';
import userPhoto from '../../assets/images/user.png'



class Users extends Component {

	constructor(props) {
		super(props);
		axios.get("https://social-network.samuraijs.com/api/1.0/users")
			.then(response => {
				this.props.setUsers(response.data.items);
			});
	}

	render() {
		return <>
			<h3>Users</h3>
			<ul className={styles.users}>
				{this.props.users.map(user => <li className={styles.userCard} key={user.id}>
					<div className={styles.userCard__top}></div>
					<div className={styles.userCard__bottom}>
						<div className={styles.imageWrapper}><img className={styles.image} src={user.photos.small !== null ? user.photos.small : userPhoto} alt="" /></div>
						<div className="about">
							<p className="name">{user.name}</p>
							<p className="name">{user.status}</p>

						</div>
						<div className={styles.p}>
							<div className={styles.p}>
								<p className={styles.p}>{"user.location.country"}</p>
								<p className={styles.p}>{"user.location.city"}</p>
							</div>
							{user.followed
								? <button onClick={() => {
									this.props.unfollow(user.id);
								}} className={styles.p}>Unfollow</button>
								: <button onClick={() => {
									this.props.follow(user.id);
								}} className={styles.p}>Follow</button>}

						</div>

					</div>
				</li>)}
			</ul>

		</>;
	}
}






export default Users;