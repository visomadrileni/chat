import {
	POST_ADD_CONTACT,
	RESET_ADD_CONTACT,
	GET_CONTACTS,
	RESET_GET_CONTACTS,
	DELETE_CONTACT,
    REMOVE_CONTACT,
    RESET
} from '../actions/types';

const initialState = {
    contacts: [],
    successMessage: [],
    result: [],
    errors: {},
    isFetching: false,
    currentContactIdIsDeleting: null
}

const addContacts = (contacts,con) => {
    return [...contacts,con];
} 
const deleteContact = (contacts,contactId) => contacts.filter(c => c.contactId !== contactId); 

export default (state=initialState,action) => {
    switch(action.type){
        case GET_CONTACTS:
            return {
                ...state,
                result: action.contacts,
                isFetching: true
            }
        
        case RESET_GET_CONTACTS: 
           return {
               ...state,
               result: [],
               isFetching: false
           }    

        case POST_ADD_CONTACT:
             return {
                 ...state,
                 result: addContacts(state.contacts,action.contact),
                 isFetching: false
             }
       
        case DELETE_CONTACT:
            return {
                ...state,
                result: deleteContact(state.result,action.contact.contactId),
                currentContactIdIsDeleting: action.contact.contactId,
                isFetching: true
            }

         case RESET_ADD_CONTACT:
             return {
                 ...state,
                 errors: {},
                 successMessage:[],
                 isFetching: false
             }   

         case REMOVE_CONTACT:
             return {
                 ...state,
                 result: deleteContact(state.result,action.contact.contactId)
             }  
             
          case RESET: 
               return state;
          default:
              return state;        
    }
}