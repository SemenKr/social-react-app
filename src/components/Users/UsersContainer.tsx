import { useSelector} from "react-redux";
import Preloader from '../common/Preloader/Preloader';

import {getIsFetching} from "../Redux/users-selectors";
import {Users} from "./Users";


// Определите интерфейс для пропсов UsersContainer
type UserPagePropsType = {
    pageTitle: string
}

export const UserPage: React.FC<UserPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return (
        <div className={" "}>
            <h2> {props.pageTitle}</h2>

            {isFetching ? <Preloader /> : null}

            <Users  />
        </div>
    )

}

