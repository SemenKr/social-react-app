import React from 'react';
import styles from './users.module.scss';
import User from "./User";


let Users = ({totalUsersCount, pageSize, followingInProgress, unfollow, follow, ...props}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);
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
                {
                    props.users.map(user => <User user={user}
                                                  followingInProgress={followingInProgress}
                                                  unfollow={unfollow}
                                                  follow={follow}
                        />
                    )
                }

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