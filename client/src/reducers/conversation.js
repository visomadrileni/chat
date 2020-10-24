import {
	SET_CURRENT_CONVERSATION,
	GET_CONVERSATIONS,
	SET_CURRENT_CONVERSATION_MESSAGES,
	ADD_MESSAGE_TO_CURRENT_CONVERSATION_MESSAGES,
	INCREMENT_CONVERSATION_UNREAD_MESSAGES,
	RESET_CONVERSATION_UNREAD_MESSAGES,
	DELETE_CONVERSATION,
	REMOVE_CONVERSATION,
    REMOVE_MESSAGE_FROM_CONVERSATION,
    RESET
} from '../actions/types';

const initialState = {
    result: [],
    currentPartnerIdConversation:null,
    currentPartnerIdIsDeleting:null,
    isFetching: false
}

export default (state=initialState,action) => {
	const setNewConversation = () => {
		return state.result.find(item => String(item.partnerId._id) === String(action.params.partner._id))
			? state.result
			: state.result.concat([{
				partnerId: action.params.partner,
				messages: [],
				unreadMessages: 0
			}]);
	};

    switch(action.type){
        case SET_CURRENT_CONVERSATION:
            return {
                ...state,
                currentPartnerIdConversation: action.data.partner._id,
                result: setNewConversation()
            }

         case GET_CONVERSATIONS:
             return {
                 ...state,
                 result: action.data.result,
                 isFetching: true
             }  
             
         case SET_CURRENT_CONVERSATION_MESSAGES:
             return {
                 ...state,
                 result: state.result.map(item => {
                     const newItem = item;
                     if(String(newItem._id) === String(action.data.partnerId)){
                         newItem.messages = action.data.result;
                     }
                     return newItem;
                 })
             }
             
          case ADD_MESSAGE_TO_CURRENT_CONVERSATION_MESSAGES:
              return {
                  ...state,
                  result: setNewConversation().map(item => {
                      const newItem = item;
                      const {message,partner} = action.data;
                      if(String(newItem._id) === String(partner._id)){
                          newItem.message = newItem.message.concat(message)
                      }

                      return newItem;
                  })
              }   

           case INCREMENT_CONVERSATION_UNREAD_MESSAGES:
               return {
                   ...state,
                   result: state.result.map(item => {
                       const newItem = item;
                       const {partner} = action.data;
                       if(newItem.partnerId._id === partner._id){
                           newItem.unreadMessages += 1;
                       }

                       return newItem;
                   })
               }  
               
            case RESET_CONVERSATION_UNREAD_MESSAGES:
                return {
                    ...state,
                    result: state.result.map(item => {
                        const newItem = item;
                        const {partner} = action.data;
                        if(newItem.partnerId._id === partner._id){
                            newItem.unreadMessages=0;
                        }
                        return newItem;
                }) 
              }

            case DELETE_CONVERSATION:
                return {
                    ...state,
                    isFetching: true,
                    currentPartnerIdConversation: action.data.partnerId
                }  

            case REMOVE_CONVERSATION:
                return {
                    ...state,
                    result: state.result.filter(item => String(item.partnerId._id) !== String(action.data.partnerId)),
                    currentPartnerIdConversation: (String(state.currentPartnerIdConversation) === String(action.data.partnerId) ? null : state.currentPartnerIdConversation)
                } 
                
            case REMOVE_MESSAGE_FROM_CONVERSATION:
                return {
                    ...state,
                    result: state.result.map(item => {
                        if(String(item.partnerId._id) === String(action.data.partnerId)){
                            item.messages = item.messages.filter(message => message._id !== action.data.messageId)
                        }
                        return item;
                    })
                } 
                
            case RESET:
                return state;
            default: 
                return state;        
    }
}