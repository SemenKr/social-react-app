import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {getAuthMeThunkCreator, logout, setAuthUserData} from '../Redux/auth-reduce';

class HeaderContainer extends React.Component {

	componentDidMount() {
		this.props.getAuthMe()
	}

	render() {
		return <Header {...this.props} />
	}

}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,

});

export default connect(mapStateToProps, {setAuthUserData, getAuthMe: getAuthMeThunkCreator, logout})(HeaderContainer);
