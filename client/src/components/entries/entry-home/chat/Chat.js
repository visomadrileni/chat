import React,{Component} from 'react';
import {connect} from 'react-redux';
import {confirmAlert} from 'react-confirm-alert';
import {postMessage,deleteMessage} from '../../../../actions/message';
import {resetConversationUnreadMessages} from '../../../../actions/conversation';
import UserInfo from '../../user-info/UserInfo';
import MessageList from '../../message/MessageList';
import Icon from '../../../others/icon/Icon';
import Label from '../../../others/label/Label';
import Button from '../../../others/button/Button';
import ContentEditable from '../../../others/editContent/ContentEditable';
import './Chat.scss';

class Chat extends Component{
    constructor(props){
        super(props);
        this.conversationContainer = React.createRef();
    }

    componentDidMount(){
        const {current} = this.conversationContainer;
        if(current){
            current.scrollTop = current.scrollHeight;
        }
    }

    setConversationIsRead = () => {
         const {conversation,dispatch} = this.props;
         const {currentPartnerIdConversation,result:conversations} = conversation;

         const currentConversation = conversations.find(item => String(item.partnerId._id) === String(currentPartnerIdConversation));
         const {partnerId,unreadMessages} = currentConversation;
         if(unreadMessages > 0){
             dispatch(resetConversationUnreadMessages(partnerId))
         }
    }

    handleSendMessage = message => {
        if(message){
            const {conversation:currentPartnerIdConversation,dispatch} = this.props;
            const params = {
                   body: {
                          message,
                          receiverId: currentPartnerIdConversation
                        }
                  }

            dispatch(postMessage(params));      
        }
    }

    handleDeleteMessage = messageId => {
        const {conversation:{currentPartnerIdConversation: partnerId},dispatch} = this.props;

        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className="confirm-popup">
                        <Label fontSemiBold text="Delete message?" fontSize={30} alignCenter margin="0px 0px 25px 0px" />
                        <div className="buttons-container">
                            <Button type="button" defaultButton small outline text="no" margin="10px" width={100} onClick={onClose} />
                            <Button type="button" defaultButton small outline text="yes" margin="10px" width={100}
                                    onClick={() => {
                                         dispatch(deleteMessage(messageId,partnerId));
                                         onClose(); 
                                      }} />
                        </div>
                    </div>
                )
            }
        })
    }

    getCurrentConversationMessages = messages => {
        const {message:deleteMessage} = this.props;
        return messages.map(message => {
            message.isFetchingAction = (deleteMessage.isFetching && String(deleteMessage.currentMessageIdIsDeleting) === String(message._id));
            return message;
        })
    }

    renderChatContainer = () => {
        const {message:getMessages,conversation:{currentPartnerIdConversation,result:{conversations}}} = this.props;

        if(!currentPartnerIdConversation){
            return (
                <div className="empty-message-container">
                    <Icon icon="chat-emoji" height={200} width={200} margin="0px 0px 25px 20px" />
                </div>
            )
        }

        const currentConversation = conversations.find(con => String(con.partnerId._id) === String(currentPartnerIdConversation));
        const {nickname,profileColor} = currentConversation.partnerId;

        return (
            <div className="chat-content">
                <header className="header-container">
                    <UserInfo
                        isFetching={false}
                        sketchDark
                        profile={{label:nickname,height:40,width:40,backgroundColor:profileColor,color:'white',labelFontSize:14}}
                        title={{text:nickname,fontSize:13,margin:"0px 0px 0px 14px"}}
                        desc={{text:'',fontSize:13,maxWidth:100,margin:"0px 0px 0px 14px"}}
                    />
                </header>
                <section ref={this.conversationContainer} className="conversation-container">
                   <MessageList 
                         isFetching={getMessages.isFetching}
                         item={this.getCurrentConversationMessages(currentConversation.messages)}
                         onMouseOver={this.setConversationIsRead}
                         onFocus={this.setConversationIsRead}
                         handleDeleteMessage={this.handleDeleteMessage}
                   />
                </section>
                <footer className="footer-container">
                    <ContentEditable onEnter={this.handleSendMessage} onFocus={this.setConversationIsRead} />
                </footer>
            </div>
        )
    }

   
    render(){
        return(
            <div className="chat-container">
                {this.renderChatContainer()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    conversation: state.conversation,
    message: state.message
});

export default connect(mapStateToProps)(Chat);