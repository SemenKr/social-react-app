import React from "react";
import d from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = '/messages/' + props.id;
  return (
      <li><NavLink className={d.contact} to={path}>{props.name}</NavLink></li>
  )
}

const ChatItem = (props) => {
    const avatars = {
        '1': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ROHOs5ZvYMsZOteE5Sz4EPUDSqt5PTmjDA&usqp=CAU',
        '2': 'https://ouch-cdn2.icons8.com/njV9HbmnIAeeWK2Mr2u39BUSLIBf2f2jjNf93ghnw1g/rs:fit:456:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNTIx/LzYyOTBlMmU4LWQ2/NmMtNDgzMS1hOWFl/LTUwNDQ3M2ZkMWZj/NS5wbmc.png',
    }
  return (
      <li>
          <img src={avatars[props.ava]} width={50} height={50} alt={props.alt}/>
          <p className={d.chat__message + ' ' + d.chat__message_self}>{props.message}</p>
      </li>
  )
}

const Dialogs = (props) => {
    return (
        <div className={d.dialogs__wrapper}>
            <div className={d.contacts}>
                <h3>Contacts</h3>
                <ul>
                    <DialogItem name='Andrey'  id={1} />
                    <DialogItem name='Alex'  id={2}/>
                    <DialogItem name='Nadin'  id={3}/>
                    <DialogItem name='Tony'  id={4}/>
                    <DialogItem name='Felix'  id={5}/>
                </ul>
            </div>
            <div className={d.chat}>
                <h3>Chat</h3>
                <ul>
                    <ChatItem ava='1' message='Hi World ...' alt='User'/>
                    <ChatItem ava='2' message='Hi Sam ...' alt='User 2'/>
                    <ChatItem ava='1' message='omg lol ...' alt='User'/>
                    <ChatItem ava='2' message='Hi World ...' alt='User 2'/>
                    <ChatItem ava='1' message='Hi World ...' alt='User'/>

                </ul>
            </div>
        </div>
    )
}

export default Dialogs;