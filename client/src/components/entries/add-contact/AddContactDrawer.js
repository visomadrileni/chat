import React,{Component} from 'react';
import {connect} from 'react-redux';
import {postAddContact,resetAddContact} from '../../../actions/contact';
import Form from '../../others/form/Form';
import Input from '../../others/input/Input';
import Button from '../../others/button/Button';
import FlashMessage from '../../others/flash-message/FlashMessage';
import './AddContactDrawer.scss'

class AddContactDrawer extends Component{
    onCloseFlashMessage = () => {
         const {dispatch} = this.props;
         dispatch(resetAddContact());
    }

    render(){
       const {dispatch,contact:addContact} = this.props;
       const {successMessage,errors,isFetching} = addContact;

       return (
             <div className="add-contact-drawer-wrapper">
                 <div className="form-container">
                     <Form
                         formName='AddContactForm'
                         values={{nickname: ''}}
                         handleSubmit={values => {
                             if(!isFetching){
                                 dispatch(postAddContact(values))
                             }}}
                         render={({handleChange,handleSubmit,values}) => {
                             return (
                                 <form onSubmit={handleSubmit}>
                                   {successMessage.nickname ? (
                                       <FlashMessage  width="100%" message={successMessage.nickname} margin="opx 0px 15px 0px" onClose={this.onCloseFlashMessage} success/>
                                       ) : null}
                                    {errors.nickname ? (
                                           <FlashMessage  width="100%" message={errors.nickname} margin="opx 0px 15px 0px" onClose={this.onCloseFlashMessage} error/>   
                                       ) : null} 

                                    <Input type='text' name='nickname' placeholder='Nickname' onChange={handleChange} defaultButton margin='0px 0px 15px 0px' /> 
                                    <Button type="submit" primary text="add nickname" width="100%" disabled={!values.nickname} isFetching={isFetching} />  
                                 </form>
                             )
                         }}     
                     />
                 </div>
             </div>
       )     
    }
}

const mapStateToProps = state => ({
    contact: state.contact
})

export default connect(mapStateToProps,{postAddContact,resetAddContact})(AddContactDrawer)