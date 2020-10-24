import {SERVER_ON,SERVER_OFF,RESET} from '../actions/types';

const initialState = {
    serverIsOn: false
}

export default (state=initialState,action) => {
    switch(action.type){
        case SERVER_ON:
         return {
             ...state,
             serverIsOn: true
         }

        case SERVER_OFF:
          return {
              ...state,
              serverIsOn: false
          } 

        case RESET:
          return state;
        default: 
           return state;    
    }
}