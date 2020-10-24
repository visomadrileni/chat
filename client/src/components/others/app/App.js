import React,{Component} from 'react';
import {ToastContainer} from 'react-toastify';
import Icon from '../icon/Icon';
import Label from '../label/Label';
import './App.scss';

export default class App extends Component{
    render(){
        const {children} = this.props;

        return (
            <div className="app-wrapper">
                <ToastContainer autoClose={10000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnHover draggable={true} position="top-right" />
                <span className="header-thing" />
                <div className="app-container">
                    <section className="logo-container">
                        <Icon fill="#ffffff" icon="message-text" height={35} width={35} />
                        <Label text="Chat App" defaultLabel fontSize={20} margin="0px 0px 0px 20px" />
                    </section>
                    <div className="app-content">{children}</div>
                </div>
            </div>
        )
    }
}