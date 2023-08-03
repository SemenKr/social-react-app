import React, {useEffect, useState} from 'react';
import styles from './users.module.scss';
import User from "./User";
import Pagination from "../ui/Pagination";


let Users = ({totalUsersCount, pageSize, followingInProgress, unfollow, follow, ...props}) => {

    const [currentPage, setCurrentPage] = useState(props.currentPage);

    // Используем useEffect для синхронизации обоих экземпляров Pagination
    useEffect(() => {
        setCurrentPage(props.currentPage);
    }, [props.currentPage]);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        props.onPageChange(pageNumber);
    };

    return (
        <section className={styles.users}>
            <h3 className={styles.users__title}>Users</h3>
            <Pagination totalUsersCount={totalUsersCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
            />
            <ul className={styles.users__List}>
                {
                    props.users.map(user => <User user={user}
                                                  key={user.id}
                                                  followingInProgress={followingInProgress}
                                                  unfollow={unfollow}
                                                  follow={follow}
                        />
                    )
                }

            </ul>

            <Pagination totalUsersCount={totalUsersCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
            />

        </section>
    );

};

export default Users;