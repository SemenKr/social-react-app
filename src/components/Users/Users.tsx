import {FC, useEffect, useState} from 'react';
import styles from './users.module.scss';
import User from "./User";
import Pagination from "../ui/Pagination.tsx";
import {UserType} from "../../types/types";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    followingInProgress: Array<number>
    unfollow: () => void
    follow: () => void
    pageNumber: number
    user: Array<UserType>
    currentPage: number
    onPageChange: (pageNumber: number) => void
}


let Users:FC<PropsType> = ({totalUsersCount, pageSize, followingInProgress, unfollow, follow, ...props}) => {

    const [currentPage, setCurrentPage] = useState(props.currentPage);

    // Используем useEffect для синхронизации обоих экземпляров Pagination
    useEffect(() => {
        setCurrentPage(props.currentPage);
    }, [props.currentPage]);

    const onPageChange = (pageNumber: number) => {
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
        </section>
    );

};

export default Users;
