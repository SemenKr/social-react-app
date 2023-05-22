import React from 'react';
import styles from './users.module.scss';
import userPhoto from '../../assets/images/user.png'
import userBG from '../../assets/images/user-bg.jpg'
import {NavLink} from "react-router-dom";


let Users = (props) => {

	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
	let pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}

	let totalPages = pages.length; // Общее количество страниц
	let currentPage = props.currentPage; // Текущая страница
	let curPF = Math.max(0, Math.min(currentPage - 5, totalPages - 10)); // Номер первой страницы для отображения
	let curPL = Math.min(totalPages, curPF + 10); // Номер последней страницы для отображения
	let slicedPages = pages.slice(curPF, curPL); // Массив страниц для отображения

	return (
		<section className={styles.users}>
			<h3 className={styles.users__title}>Users</h3>

			<ul className={styles.users__List}>
				{props.users.map(user => <li className={styles.userCard} key={user.id}>
					<div className={styles.userCard__top}>
						<img src={user.photos.large !== null ? user.photos.large : userBG} alt="" />
					</div>
					<div className={styles.userCard__bottom}>
						<NavLink to={'/profile/' + user.id}>
							<div className={styles.imageWrapper}><img className={styles.image}
								src={user.photos.small !== null ? user.photos.small : userPhoto}
								alt="" /></div>
						</NavLink>
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
								? <button  disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {props.unfollow(user.id)}} className={styles.p}>Unfollow</button>
								: <button  disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {props.follow(user.id)}} className={styles.p}>Follow</button>}
						</div>

					</div>
				</li>)}
			</ul>

			<ol className={styles.pagination__list}>
				{slicedPages.map((page, index) => {
					return <li key={index}>
						<button onClick={() => {
							props.onPageChange(page)
						}}
							className={`${styles.pagination__item} ${props.currentPage === page && styles._active}`}>{page}</button>
					</li>
				})}

			</ol>

		</section>
	);

};

export default Users;