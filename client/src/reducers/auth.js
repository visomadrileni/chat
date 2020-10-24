import {
	POST_SIGNUP,
	POST_SIGNIN,
	GET_VERIFY_NICKNAME,
	RESET_VERIFY_NICKNAME,
    RESET_SIGNIN,
    RESET
} from '../actions/types';

const initialState = {
    isFetching: false,
    errors: {}
}

export default (state=initialState,action) => {
    switch(action.type){
        case POST_SIGNIN:
            return {
                ...state,
                isFetching: true
            }

        case POST_SIGNUP:
            return {
                ...state,
                ...action.info,
                isFetching: true
            }

         case RESET_SIGNIN: 
           return {
                 ...state,
                 isFetching: false,
                 errors: {}
         } 

         case POST_SIGNUP:
             return {
                 ...state,
                 isFetching: false
             }

         case GET_VERIFY_NICKNAME:
             return {
                 ...state,
                 isFetching: true,
                 ...action.params
             }    

         case RESET_VERIFY_NICKNAME:
             return {
                 ...state,
                 isFetching: false
             }   
             
         case RESET: 
             return state;
             
         default:
             return state;    
    }
}