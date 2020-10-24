import React,{Component} from 'react';
import {connect} from 'react-redux';
import {confirmAlert} from 'react-confirm-alert';
import {closeDrawer} from '../../../actions/drawer';
import {setCurrentConversation} from '../../../actions/conversation'
import {resetGetContacts,getContacts,deleteContact} from '../../../actions/contact'
import {searchParam} from '../../../utils/utilMethods';
import ConversationList from './ConversationsList';
import Label from '../../others/label/Label';
import Button from '../../others/button/Button'; 
import './StartConversation.scss';


class StartConversation extends Component {
    constructor(props){
        super(props);
        this.state = {
            contactsSearch: { nickname: ''}
        }
    }

    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(resetGetContacts());
        dispatch(getContacts());
    }

    handleChangeSearch = (value) => {
        this.setState({
            contactsSearch: { nickname: value}
        })
    }

    handleClickConversation = (item) => {
        const {dispatch} = this.props;
        dispatch(setCurrentConversation({partner:item}))
        dispatch(closeDrawer());
    }

    handleDeleteContact = item => {
        const {dispatch} = this.props;
        const {_id} = item;
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className="confirm-popup">
                        <Label fontSemiBold text="Delete contact?" fontSize={30} alignCenter margin="0px 0px 25px 0px" />
                        <div className="buttons-container">
                            <Button type="button" defaultButton outline text="no" margin="10px" width={100} onClick={onClose} />
                            <Button type="button" defaultButton small outline text="yes" margin="10px" width={100} 
                                    onClick={() => { 
                                           onClose(); 
                                           dispatch(deleteContact({contactId:_id}))}}
                              />
                        </div>
                    </div>
                )
            }
        })
    }

    getContactsData = contacts => {
        const {contact:deleteContact} = this.props;
        return contacts.map(item => {
            const {nickname,profileColor,_id} = item;

            return {
                   nickname,
                   profileColor,
                   _id,
                   isFetchingAction: (deleteContact.isFetching && String(deleteContact.currentContactIdIsDeleting) === String(_id))
            }
        })
    }


   render(){
       const {contactsSearch} = this.state;
       const {contact:getContacts} = this.props;
       const items = searchParam(this.getContactsData(getContacts.result),contactsSearch);

       return (
           <div className="start-conversation-drawer-wrapper">
               <div>
                   <InputSearch handleSearch={this.handleChangeSearch} />
               </div>
               <ConversationList items={items} isFetching={getContacts.isFetching} emptyMessage="No contacts to show"
                                 onClickItem={this.handleClickConversation} onDeleteItem={this.handleDeleteContact}
                                 deleteDropDownMessage="delete contact" />
           </div>
       )
   }
}

const mapStateToProps = state => ({
    contact: state.contact
})

export default connect(mapStateToProps)(StartConversation)