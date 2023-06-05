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
        debugger
        console.log();
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
