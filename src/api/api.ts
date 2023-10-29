import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'b1ffcda1-585a-49b2-92cc-e80819ea450a',
    }
});
// Types

export enum ResultCodesEnum {
	Success = 0,
	Error = 1,
	CaptchaIsRequired = 10
}
interface MyDataType {
	id: number;
	email: string;
	login: string;
}

interface MyApiResponseType {
	resultCode: ResultCodesEnum;
	messages: Array<string>;
	data: MyDataType;
}

interface LoginApiResponseType {
	resultCode: ResultCodesEnum;
	messages: Array<string>;
	fieldsErrors: Array<string>
	data:  {
		userId: number
	};
}



export const userAPI = {
    getUsers(currentPage:number = 1, pageSize:number = 6) {
        return instance.get(`users?page=${currentPage}&count=${pageSize} `)
            .then(response => response.data);
    },
	deleteFollow(userId: number) {
		return instance.delete(`follow/` + userId)
			.then(response => response.data);
	},
	postFollow(userId: number) {
		return instance.post(`follow/` + userId, {},)
			.then(response => response.data);
	},
}

export const profileAPI = {
	getProfileUser(userId: number) {
		return instance.get(`profile/` + userId)
			.then(response => response.data);
	},
	getStatus(userId) {
		return instance.get(`profile/status/` + userId).catch((e) => {
			console.error('An error occurred:', e);
		});
	},
	updateStatus(status) {
		return instance.put('profile/status', {status: status});
	},
	savePhoto(photoFile) {
		const formData = new FormData()
		formData.append('image', photoFile)
		return instance.put(`profile/photo`, formData)
		.then(res => res.data)
	},
	saveProfileData(profileData) {
		console.log('Api profile' , profileData);
		return instance.put('profile/', profileData);
	}
}


export const authAPI = {
	getAuthMe() {
		return instance.get<MyApiResponseType>('/auth/me')
			.then(response => response.data);
	},
	login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
		return instance.post<LoginApiResponseType>('/auth/login', {email, password, rememberMe, captcha})

	},
	logout() {
		return instance.delete('/auth/login')
	}
}

export const securityAPI = {
	getCaptchaUrl() {
		return instance.get('/security/get-captcha-url')
	}
}
