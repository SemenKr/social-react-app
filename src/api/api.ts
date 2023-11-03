import axios from 'axios';

export const instance = axios.create({
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




export const securityAPI = {
	getCaptchaUrl() {
		return instance.get('/security/get-captcha-url')
	}
}
