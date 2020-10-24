import {
	POST_SIGNUP,
	POST_SIGNIN,
	GET_VERIFY_NICKNAME,
	RESET_VERIFY_NICKNAME,
    RESET_SIGNIN
} from './types';

export const postSignIn = info => {
    return {
        type: POST_SIGNIN,
        info
    }
}

export const resetSignIn = () => {
   return {
       type: RESET_SIGNIN
   }
}

export const postSignUp = (info,formName) => {
    return {
        type: POST_SIGNUP,
        info,
        formName
    }
}


export const getVerifyNickname = params => {
    return {
        type: GET_VERIFY_NICKNAME,
        params
    }
}

export const resetVerifyNickname = () => {
    return {
        type: RESET_VERIFY_NICKNAME
    }
}