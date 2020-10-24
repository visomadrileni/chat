import {OPEN_DRAWER,CLOSE_DRAWER,INIT_DRAWER,RESET} from '../actions/types';

export default (state=[],action) => {
    switch(action.type){
        case INIT_DRAWER:
            return {
                ...state,
                [action.drawerName]: {
                    isOpen: false
                }
            }

         case OPEN_DRAWER:
            return {
                ...state,
                [action.drawerName]: {
                    isOpen: true
                }
            }  

         case CLOSE_DRAWER:
            return {
                ...state,
                [action.drawerName]: {
                    isOpen: false
                }
            }
            
         case RESET:
             return state;
         default:
             return state;       
    }
}