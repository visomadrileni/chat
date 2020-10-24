import React,{Component} from 'react';
import {connect} from 'react-redux';
import {startChannel} from '../../../actions/socket';
import Chat from './chat/Chat';
import ActionsWrapper from './wrapper/ActionsWrapper';
import  './chat/Chat.scss';

 class HomeEntry extends Component{
    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(startChannel())
    }

    render(){
        return(
            <div className="chat-wrapper">
                <ActionsWrapper />
                <Chat />
            </div>
        )
    }
 }

 export default connect()(HomeEntry)