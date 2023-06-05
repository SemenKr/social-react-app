import React from "react";
// import Preloader from "../../common/Preloader/Preloader";

class ProfileStatus extends React.Component {

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

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        // создаем условие для того чтоб выходить из цикла обновлений статуса. и если прошлый статус равен новому обновление прекращается
        if(prevProps.status !== this.props.status) {
            this.setState({
                    status: this.props.status
            }

            )
        }
    }

    render() {
        console.log("render");
        return (
            <>
                {!this.state.editMode &&
                    <span  onDoubleClick={this.activateEditMode}>{this.props.status || '________________'}</span>
                }
                {this.state.editMode &&
                    <input autoFocus={true} onChange={this.onStatusChange} onBlur={this.deactivateEditMode} type="text" value={this.state.status}/>
                }
            </>
        )
    }
}

export default  ProfileStatus;
