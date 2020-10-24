import {combineReducers} from 'redux';
import authReducer from './auth';
import contactReducer from './contact';
import conversationReducer from './conversation';
import drawerReducer from './drawer';
import formReducer from './form';
import messagesReducers from './messages';
import socketReducer from './socket';

export default combineReducers({
    auth: authReducer,
    contact: contactReducer,
    conversation: conversationReducer,
    drawer: drawerReducer,
    form: formReducer,
    messages: messagesReducers,
    socket: socketReducer
})