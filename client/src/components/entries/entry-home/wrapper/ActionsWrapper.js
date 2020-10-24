import React,{Component} from 'react';
import {connect} from 'react-redux';
import {confirmAlert} from 'react-confirm-alert';
import {openDrawer} from '../../../../actions/drawer';
import {resetAddContact} from '../../../../actions/contact';
import {getConversations,deleteConversation,setCurrentConversation} from '../../../../actions/conversation';
import {logout,getUser,searchParam,setConversationLastMessageDateTime} from '../../../../utils/utilMethods';
import InputSearch from '../../input-search/InputsSearch';
import UserInfo from '../../user-info/UserInfo';
import AddContactDrawer from '../../add-contact/AddContactDrawer'
import ConversationList from '../../conversationCard/ConversationsList';
import StartConversation from '../../conversationCard/StartConversation';
import Icon from '../../../others/icon/Icon';
import Label from '../../../others/label/Label';
import Drawer from '../../../others/drawer/Drawer';
import Button from '../../../others/button/Button';
import DropdownMenu from '../../../others/drop-down-menu/DropdownMenu';
import './ActionsWrapper.scss';

class ActionsWrapper extends Component{
    constructor(props){
        super(props);
        this.state = {
            conversationsSearch: { nickname: ''}
        }
    }

    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(getConversations())
    }

    handleOpenAddContact = () => {
        const {dispatch} = this.props;
        dispatch(resetAddContact());
        this.openDrawer('addContact');
    }

    openDrawer = drawerName => {
        const {dispatch} = this.props;
        dispatch(resetAddContact());
        dispatch(openDrawer(drawerName))
    }

    handleOpenNewConversation = () => {
        this.openDrawer('newConversation');
    } 

    handleLogout = () => {
        logout();
    }

    handleChangeSearch = (value) => {
        this.setState({
            conversationsSearch: { nickname: value}
        })
    }
 
    conversationListToComponentData = conversations => {
        const {conversation:{currentPartnerIdConversation,isFetching,currentPartnerIdIsDeleting}} = this.props;
        
        return conversations.map(con => {
            const {unreadMessages,_id:conversationId} = con;
            const {_id,nickname,profileColor} = con.partnerId;
            const lastMessage = con.messages[con.messages.length -1];

            return {
                   nickname,
                   _id,
                   profileColor,
                   conversationId,
                   desc: lastMessage ? lastMessage.message : '',
                   rightLabel: lastMessage ? setConversationLastMessageDateTime(lastMessage.dateTime) : '',
                   unreadMessages: unreadMessages,
                   active: String(con.partnerId._id) === String(currentPartnerIdConversation),
                   isFetchingAction: (isFetching && String(currentPartnerIdIsDeleting) === _id)
            }
        })
    }

    handleClickConversationItem = item => {
        const {dispatch} = this.props;
        dispatch(setCurrentConversation(item))
    }

    handleDeleteConversation = item => {
        const {_id} = item;
        confirmAlert({
            customUI: ({onClose}) => {
                <div className="confirm-popup">
                    <Label fontSemiBold text="Delete chat?" fontSize={30} alignCenter margin="0px 0px 25px 0px" />
                    <div className="buttons-container">
                        <Button type="button" defaultButton small outline text="no" margin="10px" width={100} onClick={onClose} />
                        <Button type="button" defaultButton small outline text="yes" margin="10px" width={100}
                                onClick={() => { dispatch(deleteConversation(_id)); onClose();  }} />
                    </div>
                </div>
            }
        })
    }

    render(){
        const {conversationsSearch} = this.state;
        const {conversation:{isFetching,result}} = this.props;
        const currentUser = getUser() || {};
        const {profileColor,nickname} = currentUser;
        const conversations = this.conversationListToComponentData(result);
        const items = searchParam(conversations,conversationsSearch);


        return (
            <div className="actions-wrapper">
               <header className="header-container">
                   <div className="header-content">
                       <UserInfo
                           isFetching={false}
                           column
                           profile={{label:nickname,height:60,width:60,backgroundColor:profileColor,color:'white',labelFontSize: 16}}
                           title={{text:nickname,fontSize:16,margin:"10px 0px 0px 0px"}}
                        />

                        <div>
                            <Button type="button" height={26} width={26} link onClick={this.handleOpenAddContact}>
                                <Icon fill="#555657" icon="account-plus" height={26} width={26} />
                            </Button>
                            <Button type="button" height={26} width={26} link margin="0px 0px 0px 20px" onClick={this.handleOpenNewConversation}>
                                <Icon fill="#555657" icon="message-text" height={26} width={26} />
                            </Button>
                            <DropdownMenu
                                   options={[{
                                         text: 'Logout',
                                          event: this.handleLogout
                                        }]}
                                   icon={{fill:'#555657',icon:'dots-vertical',height:26,width:26}}
                                   marginButton="0px 0px 0px 20px"     
                            />
                        </div>
                    </div>
                </header>

               <div>
                   <InputSearch handleChange={this.handleChangeSearch} />
               </div>

               <ConversationList
                      items={items}
                      isFetching={isFetching}
                      emptyMessage="No conversations to show"
                      onClickItem={this.handleClickConversationItem}
                      onDeleteItem={this.handleDeleteConversation}
                      deleteDropDownMessage="delete chat"
                />
               <Drawer drawerName="addContact" tittle="add contact">
                      <AddContactDrawer />
               </Drawer>
               <Drawer drawerName="newConversation" tittle="new conversation">
                      <StartConversation drawerName="newConversation" />
               </Drawer>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    contact: state.contact,
    conversation: state.conversation
});

export default connect(mapStateToProps)(ActionsWrapper)