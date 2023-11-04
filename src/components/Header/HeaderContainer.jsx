import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {actions, getAuthUserData, logout} from '../Redux/auth-reduce.ts';

class HeaderContainer extends React.Component {

	render() {
		return <Header {...this.props} />
	}

}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,

});

export default connect(mapStateToProps, {setAuthUserData: actions.setAuthUserData, getAuthMe: getAuthUserData, logout})(HeaderContainer);
