import {ChangeEvent, Component} from "react";
// import Preloader from "../../common/Preloader/Preloader";


// Определение пропсов компонента
interface ProfileStatusProps {
	status: string;
	updateStatus: (newStatus: string) => void;
}

// Определение состояния компонента
interface ProfileStatusState {
	editMode: boolean;
	status: string;
}

class ProfileStatus extends Component<ProfileStatusProps, ProfileStatusState> {

	state = {
		editMode: false,
		status: this.props.status,
	}

	activateEditMode = () => {
		this.setState({
			editMode: true,
		})
	}

	deactivateEditMode = () => {
		this.setState({
			editMode: false,
		})
		this.props.updateStatus(this.state.status)
	}

	onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			status: e.currentTarget.value
		})
	}

	componentDidUpdate(prevProps: ProfileStatusProps, prevState: ProfileStatusState) {
		// создаем условие для того чтоб выходить из цикла обновлений статуса. и если прошлый статус равен новому обновление прекращается
		if (prevProps.status !== this.props.status) {
			this.setState({
				status: this.props.status
			}

			)
		}
	}

	render() {
		return (
			<>
				{!this.state.editMode &&
					<span onDoubleClick={this.activateEditMode}>{this.props.status || '________________'}</span>
				}
				{this.state.editMode &&
					<input
						autoFocus={true}
						onChange={this.onStatusChange}
						onBlur={this.deactivateEditMode}
						type="text" value={this.state.status} />
				}
			</>
		)
	}
}

export default ProfileStatus;
