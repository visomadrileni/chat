import React,{Component} from 'react';
import {connect} from 'react-redux';
import {resetSignIn,postSignIn} from '../../../actions/auth';
import Form from '../../others/form/Form';
import Input from '../../others/input/Input';
import Button from '../../others/button/Button';
import FlashMessage from '../../others/flash-message/FlashMessage';

class SignInForm extends Component{
   onCloseFlashMessage = () => {
       const {dispatch} = this.props;
       dispatch(resetSignIn())
   }

   render(){
       const {auth:signIn,dispatch} = this.props;
       const {errors} = signIn;

       return (
           <Form
               formName="SignInForm"
               values={{nickname:'',password:''}}
               handleSubmit={values => {
                   if(!signIn.isFetching){
                       dispatch(postSignIn(values))
                   }}}
               render={({handleChange,handleSubmit,form}) => {
                   return (
                       <form onSubmit={handleSubmit}>
                           {errors.nickname ? (
                               <FlashMessage error width={280} message={errors.nickname} onClose={this.onCloseFlashMessage} />
                             ) : null}

                          <Input name="nickname" placeholder="Your Nickname" type="text" onChange={handleChange} width={280}
                                 maxLength={12} defaultButton margin="13px 0px 13px 0px" />
                          <Input name="password" placeholder="Password" type="password" onChange={handleChange} width={280} 
                                 maxLength={12} defaultButton margin="13px 0px 13px 0px" />
                          <Button type="submit" primary text="Sign Up" width={280} isFetching={signIn.isFetching} 
                                  margin="24px 0px 0px 0px"  />
                       </form>
                   )
               }}    
           />
       )
   }
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(SignInForm)