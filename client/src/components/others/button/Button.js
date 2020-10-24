import React,{Component} from 'react';
import classnames from 'classnames';
import Loading from '../loading/Loading';
import './Button.scss';

export default class Button extends Component{
    render(){
       const {text,primary,link,width,onClick,type,isFetching,disabled,children,margin,defaultButton,outline,small,setRef} = this.props;
       const buttonStyles = classnames({
           button:true,
           'button-primary': primary && !disabled,
           'button-disabled': disabled,
           'button-link': link,
           'button-default': defaultButton && !disabled,
           outline,
           small
       })


        return (
            <button type={type} className={buttonStyles} style={{width,margin}} disabled={disabled} ref={setRef} onClick={e => { 
                e.stopPropagation();
                onClick(e)
             }}>
               {isFetching && !disabled ? <Loading type='spinner' /> : text}
               {children}
            </button>
        )
    }
}
