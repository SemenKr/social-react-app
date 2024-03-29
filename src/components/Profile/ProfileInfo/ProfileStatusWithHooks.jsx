import React, {useEffect, useState} from "react";

const ProfileStatusWithHooks = (props) =>  {

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }


    return (
            <>
                { !editMode &&
                    <span onDoubleClick={activateEditMode} >{props.status || '________________'}</span>
                }
                { editMode &&
                    <input autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} value={status} type={"text"} />
                }
            </>
        )

}

export default  ProfileStatusWithHooks;
