import React from "react";
import d from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import {Navigate} from "react-router";
import {Field, Form, FormSpy} from "react-final-form";
import styles from "../Login/Login.module.scss";
import {Button} from "@mui/material";

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
	let state = props.dialogs;

	const dialogItems = state.dialogData.map(dialog => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />);

	const chatItems = state.chatData.map(chatItem => <ChatItem key={chatItem.id} ava={chatItem.ava} message={chatItem.message} alt={chatItem.alt} />)


	const addMessage = (values) => {
		props.sendMessage(values.newChatMessage)
	};

	if (!props.isAuth) {
	 return  <Navigate to={'/login'} />
	}

	return (
		<div className={d.dialogs__wrapper}>
			<div className={d.contacts}>
				<h3>Contacts</h3>
				<ul>
					{dialogItems}
				</ul>
			</div>
			<div className={d.chat}>
				<h3>Chat</h3>
				<ul>
					{chatItems}
				</ul>
				<AddMessageForm onSubmit={addMessage} state={state}/>

			</div>
		</div>
	)
}

const AddMessageForm = (props) => {
	const required = values => (values ? undefined : "Required")

	return (
		<div className={d.chat__newMessage}>
			<Form onSubmit={props.onSubmit}>
				{({handleSubmit, values}) => (
					<form onSubmit={handleSubmit} >
						<Field name='newChatMessage'
							   validate={required}
							   component='textarea'
							   subscription={{
								   value: true,
								   active: true,
								   touched: true,
								   error: true,
							   }}
						>{({input, meta, placeholder}) => (
							<div className={`${styles.fieldWrapper} ${meta.active ? styles.active : ''}`}>
								{/*<label htmlFor="fitstName">Имя</label>*/}
								<textarea {...input}  className={d.textField__input}  wrap="soft" id="" rows="2" />
							</div>
						)}</Field>
						<FormSpy subscription={{pristine: true}}>
							{props => (
								<Button
									variant="contained"
									type="submit"
									disabled={props.pristine}
								>
									Send
								</Button>
							)}
						</FormSpy>
					</form>
				)}
			</Form>
		</div>
	)
}

export default Dialogs;
