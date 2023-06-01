import React from "react";
// import Preloader from "../../common/Preloader/Preloader";

const ProfileStatus = (props) => {

    return (
        <>
            <span>{props.status}</span>
            <input type="text" value={props.status}/>
        </>
    )
}
export default  ProfileStatus;
