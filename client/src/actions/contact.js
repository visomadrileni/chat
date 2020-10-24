import {
	POST_ADD_CONTACT,
	RESET_ADD_CONTACT,
	GET_CONTACTS,
	RESET_GET_CONTACTS,
	DELETE_CONTACT,
	REMOVE_CONTACT
} from './types';

export const getContacts = contacts => {
    return {
        type: GET_CONTACTS,
        contacts
    }
}

export const postAddContact = contact => {
    return {
        type: POST_ADD_CONTACT,
        contact
    }
}


export const resetGetContacts = () => {
    return {
        type: RESET_GET_CONTACTS
    }
}

export const resetAddContact = () => {
    return {
        type: RESET_ADD_CONTACT
    }
}

export const removeContact = contact => {
    return {
        type: REMOVE_CONTACT,
        contact
    }
}

export const deleteContact = contact => {
    return {
        type: DELETE_CONTACT,
        contact
    }
}