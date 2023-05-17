import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: {
		'API-KEY': 'b1ffcda1-585a-49b2-92cc-e80819ea450a',
	}
});

export const getUsers = (currentPage = 1, pageSize = 6) => {
	return instance.get(`users?page=${currentPage}&count=${pageSize} `)
		.then(response => response.data);
}

export const getAuthMe = () => {
	return instance.get('auth/me')
		.then(response => response.data);
}

export const getProfileUser = (userId) => {
	return instance.get(`profile/` + userId)
		.then(response => response.data);
}

export const deleteFollow = (userId) => {
	return instance.delete(`follow/` + userId)
		.then(response => response.data);
}

export const postFollow = (userId,) => {
	return instance.post(`follow/` + userId, {},)
		.then(response => response.data);
}


