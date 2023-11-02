import {Component} from "react";
import {connect} from "react-redux";
import Users from './Users.tsx';
import Preloader from '../common/Preloader/Preloader';
import {getUsersThunkCreator, unfollowThunkCreator, followThunkCreator, actions} from "../Redux/users-reducer.ts";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers} from "../Redux/users-selectors.ts";
import {UserType} from "../../types/types";
import {AppStateType} from "../Redux/redux-store";

// Определите интерфейс для пропсов UsersContainer

interface MapStateToProps {

    users: UserType[]
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    isFetching: boolean;
    followingInProgress: Array<number>;
}
interface MapDispatchToProps {
    setCurrentPage: (page: number) => void;
    toggleIsFollowing: (isFollowing: boolean) => void;
    requestUsers: (page: number, pageSize: number) => void;
    unfollow: (userId: number) => void;
    follow: (userId: number) => void;
}
interface OwnProps {
    pageTitle: string
}
type UsersContainerProps = MapStateToProps & MapDispatchToProps & OwnProps;


class UsersContainer extends Component<UsersContainerProps> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize)
    }

    onPageChange = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.requestUsers(pageNumber, pageSize)
    }

    render() {

        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <h2>{this.props.pageTitle}</h2>
                <Users onPageChange={this.onPageChange}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       users={this.props.users}
                       unfollow={this.props.unfollow}
                       follow={this.props.follow}
                       isFetching={this.props.isFetching}
                       followingInProgress={this.props.followingInProgress}
                       toggleIsFollowing={this.props.toggleIsFollowing}
                />
            </>
        )
    }
}

// принимает весь state и меняет
let mapStateToProps= (state: AppStateType):MapStateToProps  => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
};
// TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
export default compose(connect<MapStateToProps, MapDispatchToProps, OwnProps, AppStateType>(
    mapStateToProps, {
        setCurrentPage: actions.setCurrentPage,
        toggleIsFollowing: actions.toggleIsFollowing,
        requestUsers: getUsersThunkCreator,
        unfollow: unfollowThunkCreator,
        follow: followThunkCreator,
    }),
    withAuthRedirect
)(UsersContainer)
