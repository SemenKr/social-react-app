import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect, useDispatch, useSelector} from "react-redux";
import {
	actions,
	getProfileUserThunk,
	getStatus,
	savePhoto,
	saveProfileData,
	updateStatus
} from "../Redux/profile-reducer.ts";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";


// Функция для получения данных профиля и статуса
const fetchUserProfileData = (dispatch, userId, authorisedUserId, navigate) => {
	if (!userId) {
		if (!authorisedUserId) {
			navigate("/login"); // Перенаправление на страницу входа, если нет userId и не авторизован пользователь
		} else {
			dispatch(getProfileUserThunk(authorisedUserId)); // Получение профиля и статуса авторизованного пользователя
			dispatch(getStatus(authorisedUserId));
		}
	} else {
		dispatch(getProfileUserThunk(userId)); // Получение профиля и статуса пользователя с указанным userId
		dispatch(getStatus(userId));
	}
};
const ProfileContainer = (props) => {
	// const location = useLocation();
	// const navigate = useNavigate();
	// Извлекаем параметры маршрута и другие данные из хуков
	const params = useParams(); // Параметры маршрута, включая "userId"
	const authorisedUserId = useSelector(state => state.auth.id); // ID авторизованного пользователя из Redux
	const profile = useSelector(state => state.profilePage.profile); // Данные профиля из Redux
	const status = useSelector(state => state.profilePage.status); // Статус из Redux
	const dispatch = useDispatch(); // Получаем функцию dispatch из Redux
	const { userId } = params; // Извлекаем userId из параметров маршрута


	// Эффект для запроса данных профиля и статуса
	useEffect(() => {
		const parsedUserId = +userId; // Преобразование userId в число
		fetchUserProfileData(dispatch, parsedUserId, authorisedUserId); // Вызываем функцию для запроса данных
	}, [dispatch, userId, authorisedUserId]); // Зависимости эффекта

	// Обработчик обновления статуса
	const handleStatusUpdate = (newStatus) => {
		dispatch(updateStatus(newStatus)); // Вызываем action creator для обновления статуса
	};
	// Рендерим компонент Profile, передавая ему данные и обработчики
	return (
		<Profile
			profile={profile}
			status={status}
			updateStatus={handleStatusUpdate}
			isOwner={!userId}
			savePhoto={props.savePhoto}
			saveProfileData={props.saveProfileData}
		/>
	);
};
// Применяем HOC для редиректа на страницу входа, если пользователь не авторизован
 withAuthRedirect(ProfileContainer);
// Функция mapStateToProps для связывания состояния Redux с props
const mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorisedUserId: state.auth.id,
	isAuth: state.auth.isAuth
});

// HOC withRouter, который добавляет props связанные с маршрутизацией
function withRouter(Component) {

	function ComponentWithRouterProp(props) {
		let location = useLocation(); // Получаем информацию о текущем местоположении
		let navigate = useNavigate(); // Получаем функцию для навигации
		let params = useParams(); // Получаем параметры маршрута

		return <Component
			{...props}
			router={{ location, navigate, params }} /> // Передаем связанные с маршрутизацией свойства
	}

	return ComponentWithRouterProp
}
// Оборачиваем компонент ProfileContainer в HOC-компоненты и связываем с Redux
export default compose(
	withRouter,
	withAuthRedirect,
	connect(mapStateToProps, { setUserProfile: actions.setUserProfile(), getProfileUserThunk, getStatus, updateStatus, savePhoto, saveProfileData }),
)(ProfileContainer);
