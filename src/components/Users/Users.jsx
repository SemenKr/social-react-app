import React, {Component} from "react";
import styles from './users.module.scss';
import axios from 'axios';
import userPhoto from '../../assets/images/user.png'



class Users extends Component {

	componentDidMount() {
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize} `)
			.then(response => {
				this.props.setUsers(response.data.items);
				this.props.setTotalUsersCount(response.data.totalCount);

			});
	}

	onPageChange = (pageNumber) => {
		this.props.setCurrentPage(pageNumber)
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize} `)
			.then(response => {
				this.props.setUsers(response.data.items);

			});
	}

	render() {

		let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

		let pages = [];
		for (let i = 1; i <= pagesCount; i++) {

			pages.push(i);

		}

		let currentPage = this.props.currentPage;
		let currentPageFirst = ((currentPage - 5) < 0) ? 0 : currentPage - 5;
		let currentPageLast = currentPage + 5;
		let slicedPages = pages.slice(currentPageFirst, currentPageLast);



		return <>
			<h3>Users</h3>
			<ol className={styles.pagination__list}>
				{slicedPages.map((page, index) => {
					return <li key={index}><button onClick={() => {this.onPageChange(page)}} className={`${styles.pagination__item} ${this.props.currentPage === page && styles._active}`} >{page}</button></li>
				})}

			</ol >
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