import React,{Component} from 'react';
import SignUpForm from './SignUpForm';
import Auth from '../../others/auth/Auth';
import Label from '../../others/label/Label';
import Button from '../../others/button/Button';

export default class SignUp extends Component{
    handleClickSignInButton = () => {
        const {history} = this.props;
        history.push('/signin');
    }

    render(){
        return (
            <Auth
               title="SignUp"
               formContainer={(<SignUpForm />)}
               footerInfo={(<Label title="Already have an account?" />)}
               footerInfoLink={(<Button text="SignIn" link width={80} onClick={this.handleClickSignInButton} />)}
            />
        )
    }
}