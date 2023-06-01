import React from "react";
// import Preloader from "../../common/Preloader/Preloader";

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
    }

    activateEditMode () {
        this.setState({
            editMode: true,
        })
    }

    deactivateEditMode () {
        this.setState({
            editMode: false,
        })
    }
    render() {

        return (
            <>
                {!this.state.editMode &&
                    <span  onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                }
                {this.state.editMode &&
                    <input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} type="text" value={this.props.status}/>
                }
            </>
        )
    }
}

export default  ProfileStatus;
