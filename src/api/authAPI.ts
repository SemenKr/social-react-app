import {APIResponseType, instance, ResultCodeEnum} from "./api";
import {ValueObjLoginType} from "../components/Redux/auth-reduce";


type MeResponseDataType = {
    id: number,
    email: string,
    login: string,
}


type LoginResponseDataType = { userId: number }

type LoginResultCode = ResultCodeEnum


export const authAPI = {

    getAuthMe() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`)
            .then(res => res.data)
    },

    login(values: ValueObjLoginType) {
        return instance.post<APIResponseType<LoginResponseDataType, LoginResultCode>>(
            `auth/login`,
            values).then(res => res.data)
    },

    logout() {
        return instance.delete(`auth/login`)
    }

}


// export type LoginMeResponseType = {
//    data: {
//       userId: number
//
//    },
//    resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum,
// }
