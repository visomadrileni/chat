import React,{Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {postSignUp,getVerifyNickname} from '../../../actions/auth';
import Icon from '../../others/icon/Icon';
import Form from '../../others/form/Form';
import Input from '../../others/input/Input';
import Button from '../../others/button/Button';
import Loading from '../../others/loading/Loading';

class SignUpForm extends Component{
   render(){
       const {auth:{verifyNickname,signUp},dispatch} = this.props;

       return (
           <Form
               formName="SignUpForm"
               values={{nickname:'',password:'',confirmPassword: ''}}
               handleSubmit={(values,formName) => {
                   if(!signUp.isFetching){
                       dispatch(postSignUp(values,formName))
                   }}}
               validate={(values,errors,resetErrors,keys) => {
                   const {newErrors} = errors;
                   const {nickname,password,confirmPassword} = values;

                   if(_.includes(keys,'nickname')){
                       if(resetErrors){ delete newErrors.nickname; }
                       if(!nickname){ newErrors.nickname = "Please enter your nickname" }
                       else if(nickname.length < 6 || nickname.length > 13){
                           newErrors.nickname = "Nickname must be between 6 and 13 charcters"
                       }
                   }

                   if(_.includes(keys,'password') || _.includes(keys,'confirmPassword')){
                       if(resetErrors){ 
                           delete newErrors.password;
                           delete newErrors.confirmPassword;
                       }

                       if(!password){
                           newErrors.password = "Please enter your password";
                       } else if(password.length < 8 || password.length > 15){
                           newErrors.password = "Password must be between 8 and 15 characters"
                       } else if(!confirmPassword){
                           newErrors.confirmPassword = "Please confirm your password"
                       } else if( password === confirmPassword){
                           newErrors.confirmPassword = "password doesnt match"
                       }
                   }

                   return newErrors;
                   }}  

                validateAsync={(key,value,formName) => {
                    if(key === 'nickname'){
                        const params = {body:{nickname:value},formName};
                        dispatch(getVerifyNickname(...params))
                 }}}
                debounceValidation={{nickname:300}}
                render={({handleChange,handleSubmit,handleBlur,handleFocus,form}) => {
                    const {touched,errors,values} = form;

                    return (
                        <form onSubmit={handleSubmit}>
                            <Input name="nickname" placeholder="Nickname" type="text" hasError={touched.nickname && errors.nickname} 
                                   errorMessage={errors.nickname} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} width={200}
                                   maxLength={12} defaultLabel iconRight iconComponent={() => {
                                        if(values.nickname.length > 0){
                                            if(verifyNickname.isFetching){
                                                return (<Loading type="donut" />)
                                            }

                                            if(!_.isEmpty(verifyNickname.errors)){
                                                return (<Icon fill="#da7079" icon="alert" height={26} width={26} />)
                                            }

                                            if(!(touched.nickname && errors.nickname)){
                                                return (<Icon fill="#55c37c" icon="checked" height={24} width={24} />)
                                            }
                                       }
                                  return null;      
                            }} />

                            <Input name="password" placeholder="Password" type="password" hasError={touched.password && errors.password} 
                                   errorMessage={errors.password} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} width={200}
                                   maxLength={12} defaultLabel margin="13px 0px 13px 0px" />
                            <Input name="confirmPassword" placeholder="Confirm Password" type="password" hasError={touched.confirmPassword && errors.confirmPassword} 
                                   errorMessage={errors.confirmPassword} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} width={200}
                                   maxLength={12} defaultLabel margin="13px 0px 13px 0px" />
                            <Button type="submit" primary text="Sign Up" isFetching={signUp.isFetching} disabled={verifyNickname.isFetching} margin="24px 0px 0px 0px" width={280} />       
                        </form>
                    )
                }} 
           />
       )
   }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(SignUpForm);