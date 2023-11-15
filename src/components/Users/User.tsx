import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";
// @ts-ignore
import userPhoto from '../../assets/images/user.png';
import {FC} from "react";


type PropsType = {
    user: UserType;
    followingInProgress: Array<number>;
    unfollow: (userId: number) => void;
    follow: (userId: number) => void;
}
let User: FC<PropsType> = (props) => {

    let user = props.user


    return (
        <div>
         <span>
            <div>
               <NavLink to={'/profile/' + user.id}>
                  <img src={user.photos.small !== null
                      ? user.photos.small
                      : userPhoto}
                       className={""}
                       alt={'fff'}/>
               </NavLink>
            </div>

            <div>
               {user.followed
                   ?
                   <button
                       disabled={
                           props.followingInProgress.some(id => id === user.id)}
                       onClick={() => {

                           props.unfollow(user.id)

                       }}>
                       Unfollow
                   </button>

                   :
                   <button
                       disabled={props.followingInProgress.some(id => id === user.id)}
                       onClick={() => {

                           props.follow(user.id)

                       }}>
                       Follow
                   </button>}
            </div>
         </span>

            <span>
            <span>
               <div>
                  {user.name}
               </div>
               <div>
                  {user.status}
               </div>
            </span>

            <span>
               <div>
                  {'user.location.country'}
               </div>
               <div>
                  {'user.location.city'}
               </div>
            </span>
         </span>

        </div>)
}


export default User





