import {POST_MESSAGE,GET_MESSAGES,DELETE_MESSAGE} from './types';

 export const postMessage = message => {
     return {
         type: POST_MESSAGE,
         message
     }
 }

 export const getMessages = messages => {
     return {
         type: GET_MESSAGES,
         messages
     }
 }

 export const deleteMessage = message => {
     return {
         type: DELETE_MESSAGE,
         message
     }
 }