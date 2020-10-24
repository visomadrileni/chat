import {INIT_FORM,UPDATE_FORM,SET_FORM_ERROR,RESET} from '../actions/types';

export default (state=[],action) => {
    switch(action.type){
        case INIT_FORM:
            return {
                ...state,
                [action.formName]: {
                    ...action.data
                }
            }

        case UPDATE_FORM:
            return {
                ...state,
                [action.updateForm]: {
                    ...action.updateForm,
                    ...action.data
                }
            }  
            
        case SET_FORM_ERROR:
            return {
                ...state,
                [action.setForm]: {
                    ...action.setForm,
                    errors: {
                        ...action.data.errors,
                        ...state[action.setForm].errors
                    }
                }
            }  
            
        case RESET:
            return state;
        default: 
            return state;        
    }
}