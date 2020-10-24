import {
	SET_CURRENT_CONVERSATION,
	GET_CONVERSATIONS,
	SET_CURRENT_CONVERSATION_MESSAGES,
	ADD_MESSAGE_TO_CURRENT_CONVERSATION_MESSAGES,
	INCREMENT_CONVERSATION_UNREAD_MESSAGES,
	RESET_CONVERSATION_UNREAD_MESSAGES,
	DELETE_CONVERSATION,
	REMOVE_CONVERSATION,
	REMOVE_MESSAGE_FROM_CONVERSATION
} from './types';

export const setCurrentConversation = data => {
    return {
        type:SET_CURRENT_CONVERSATION,
        data
    }
}

export const getConversations = () => {
    return {
        type: GET_CONVERSATIONS
    }
}

export const setCurrentConversationMessages = data  => {
    return {
        type: SET_CURRENT_CONVERSATION_MESSAGES,
        data 
    }
}

export const addMessageToCurrentConversationMessages = data  => {
     return {
         type: ADD_MESSAGE_TO_CURRENT_CONVERSATION_MESSAGES,
         data 
     }
}

export const incrementConversationUnreadMessages = data  => {
    return {
        type: INCREMENT_CONVERSATION_UNREAD_MESSAGES,
        data 
    }
}

export const resetConversationUnreadMessages = data  => {
    return {
        type: RESET_CONVERSATION_UNREAD_MESSAGES,
        data 
    }
}

export const deleteConversation = data  => {
    return {
        type: DELETE_CONVERSATION,
        data 
    }
}

export const removeConversation = data  => {
    return {
        type: REMOVE_CONVERSATION,
        data 
    }
}

export const removeMessageFromConversation = data  => {
    return {
        type: REMOVE_MESSAGE_FROM_CONVERSATION,
        data 
    }
}