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
			<img src={avatars[props.ava]} width={50} height={50} alt={props.alt} />
			<p className={d.chat__message + ' ' + d.chat__message_self}>{props.message}</p>
		</li>
	)
}

const Dialogs = (props) => {

	const dialogData = [
		{id: 1, name: 'Andrew'},
		{id: 2, name: 'Alex'},
		{id: 3, name: 'Nadine'},
		{id: 4, name: 'Tony'},
		{id: 5, name: 'Felix'},
		{id: 6, name: 'Uliana'},
	];

	const chatData = [
		{id: 1, message: 'Hi World ...'},
		{id: 2, message: 'Hi Sam ...'},
		{id: 3, message: 'omg lol ...'},
		{id: 4, message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati ducimus inventore odit exercitationem reprehenderit. Iure ullam aut reprehenderit cupiditate sed incidunt temporibus, molestiae laboriosam doloribus laudantium labore eius eaque?'},
		{id: 5, message: 'Hi World ...'},
		{id: 6, message: 'omg lol ...'},
	];



	return (
		<div className={d.dialogs__wrapper}>
			<div className={d.contacts}>
				<h3>Contacts</h3>
				<ul>
					<DialogItem name={dialogData[0].name} id={dialogData[0].id} />
					<DialogItem name={dialogData[1].name} id={dialogData[1].id} />
					<DialogItem name={dialogData[2].name} id={dialogData[2].id} />
					<DialogItem name={dialogData[3].name} id={dialogData[3].id} />
					<DialogItem name={dialogData[4].name} id={dialogData[4].id} />
				</ul>
			</div>
			<div className={d.chat}>
				<h3>Chat</h3>
				<ul>
					<ChatItem ava='1' message={chatData[0].message} alt='User' />
					<ChatItem ava='2' message={chatData[1].message} alt='User 2' />
					<ChatItem ava='1' message={chatData[2].message} alt='User' />
					<ChatItem ava='2' message={chatData[3].message} alt='User 2' />
					<ChatItem ava='1' message={chatData[4].message} alt='User' />

				</ul>
			</div>
		</div>
	)
}

export default Dialogs;
