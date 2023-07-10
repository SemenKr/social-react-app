import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {getAuthUserData, logout, setAuthUserData} from '../Redux/auth-reduce';

class HeaderContainer extends React.Component {

	render() {
		return <Header {...this.props} />
	}

}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,

});

export default connect(mapStateToProps, {setAuthUserData, getAuthMe: getAuthUserData, logout})(HeaderContainer);
