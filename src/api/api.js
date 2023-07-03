  import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'b1ffcda1-585a-49b2-92cc-e80819ea450a',
    }
});


export const userAPI = {
    getUsers(currentPage = 1, pageSize = 6) {
        return instance.get(`users?page=${currentPage}&count=${pageSize} `)
            .then(response => response.data);
    },
	deleteFollow(userId) {
		return instance.delete(`follow/` + userId)
			.then(response => response.data);
	},
	postFollow(userId) {
		return instance.post(`follow/` + userId, {},)
			.then(response => response.data);
	},
}

export const profileAPI = {
	getProfileUser(userId) {
		return instance.get(`profile/` + userId)
			.then(response => response.data);
	},
	getStatus(userId) {
		return instance.get(`profile/status/` + userId)
	},
	updateStatus(status) {
		return instance.put('profile/status', {status: status});
	}
}


export const authAPI = {
	getAuthMe() {
		return instance.get('/auth/me')
			.then(response => response.data);
	},
	login(email, password, rememberMe = false) {
		return instance.post('/auth/login', {email, password, rememberMe})

	},
	logout() {
		return instance.delete('/auth/login')
	}

}
