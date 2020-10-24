import React,{Component} from 'react';
import './Auth.scss';

export default class Auth extends Component{
    render(){
        const {title,formContainer,footerInfo,footerInfoLink} = this.props;

        return(
            <section className="auth-wrapper">
                <div className="form-container">
                    <h1 className="title">{title}</h1>
                    {formContainer}
                    <div className="info-conainer">{footerInfo}{footerInfoLink}</div>
                </div>
            </section>
        )
    }
}