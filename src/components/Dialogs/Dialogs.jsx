import React from "react";
import d from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

const Dialogs = (props) => {
    return (
        <div className={d.dialogs__wrapper}>
            <div className={d.contacts}>
                <h3>Contacts</h3>
                <ul>
                    <li><NavLink className={d.contact + ' ' + d.active} to='/messages/0'>Andrey</NavLink></li>
                    <li><NavLink className={d.contact} to='/messages/1'>Aleksander</NavLink></li>
                    <li><NavLink className={d.contact} to='/messages/2'>Nadin</NavLink></li>
                    <li><NavLink className={d.contact} to='/messages/3'>Tony</NavLink></li>
                    <li><NavLink className={d.contact} to='/messages/4'>Felix</NavLink></li>
                </ul>
            </div>
            <div className={d.chat}>
                <h3>Chat</h3>
                <ul>
                    <li>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ROHOs5ZvYMsZOteE5Sz4EPUDSqt5PTmjDA&usqp=CAU" width={50} height={50} alt="ava"/>
                        <p className={d.chat__message + ' ' + d.chat__message_self}>Hi World</p>
                    </li>
                    <li>
                        <img src="https://ouch-cdn2.icons8.com/njV9HbmnIAeeWK2Mr2u39BUSLIBf2f2jjNf93ghnw1g/rs:fit:456:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNTIx/LzYyOTBlMmU4LWQ2/NmMtNDgzMS1hOWFl/LTUwNDQ3M2ZkMWZj/NS5wbmc.png" width={50} height={50} alt="ava"/>
                        <p className={d.chat__message + ' ' + d.chat__message_self}>Hi World</p>
                    </li>
                    <li>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ROHOs5ZvYMsZOteE5Sz4EPUDSqt5PTmjDA&usqp=CAU" width={50} height={50} alt="ava"/>
                        <p className={d.chat__message + ' ' + d.chat__message_self}>Hi World</p>
                    </li>
                    <li>
                        <img src="https://ouch-cdn2.icons8.com/njV9HbmnIAeeWK2Mr2u39BUSLIBf2f2jjNf93ghnw1g/rs:fit:456:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNTIx/LzYyOTBlMmU4LWQ2/NmMtNDgzMS1hOWFl/LTUwNDQ3M2ZkMWZj/NS5wbmc.png" width={50} height={50} alt="ava"/>
                        <p className={d.chat__message + ' ' + d.chat__message_self}>Hi World</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Dialogs;