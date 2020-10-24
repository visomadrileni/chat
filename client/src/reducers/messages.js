import {POST_MESSAGE,GET_MESSAGES,DELETE_MESSAGE,RESET} from '../actions/types';

const initialState = {
    messages: [],
    isFetching: false,
    currentMessageIdIsDeleting: null
}

const postMessage = (messages,msg) => {
    return [...messages,msg];
}

const deleteMessage = (messages,messageId) => messages.filter(message =>  message.id !== messageId._id);

export default (state=initialState,action) => {
    switch(action.type){
        case POST_MESSAGE:
            return {
                ...state,
                messages: postMessage(state.messages,action.message),
                isFetching: true
            }

        case GET_MESSAGES: 
           return {
               ...state,
               isFetching: true
           }  

        case DELETE_MESSAGE:
            return {
                ...state,
                isFetching: true,
                messages: deleteMessage(state.messages,action.message),
                currentMessageIdIsDeleting: action.message
            } 
            
        case RESET:
            return state;
        default:
              return state;        
    }
}