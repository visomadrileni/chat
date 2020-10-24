import React,{Component} from 'react';
import SignInForm from './SignInForm';
import Auth from '../../others/auth/Auth';
import Label from '../../others/label/Label';
import Button from '../../others/button/Button';

export default class SignIn extends Component {
    handleClickSignInButton = () => {
        const {history} = this.props;
        history.push('/signup');
    }

    render(){
        return (
            <Auth 
                title="Sign In"
                formContainer={(<SignInForm />)}
                footerInfo={(<Label text="Don't have an account?" />)}
                footerInfoLink={(<Button link text="Sign Up" width={80} onClick={this.handleClickSignInButton} /> )}
            />
        )
    }
}
