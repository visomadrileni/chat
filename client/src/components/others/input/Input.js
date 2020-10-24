import React,{Component} from 'react';
import classnames from 'classnames';
import Label from '../label/Label';
import './Input.scss';

export default class Input extends Component{
    render(){
        const {placeholder,width,height,margin,type,id,value,onChange,onFocus,onBlur,errorMessage,hasError,name,
              iconComponent,maxLength,defaultButton,search,clean,iconLeft,iconRight} = this.props;

        const inputStyles = classnames({
            input:true,
            default: defaultButton,
            search,
            clean,
            'input-error': hasError
         })

        const iconContainerStyles = classnames({
            'input-icon-container': true,
            'icon-left':iconLeft,
            'icon-right': iconRight
        })  

        return (
            <div className="input-wrapper" style={{margin,maxWidth:width}}>
              <div className="input-container">
                <input id={id} className={inputStyles} type={type} placeholder={placeholder} name={name}
                       value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} style={{width,height}}
                       maxLength={maxLength} />
                <div className={iconContainerStyles}>{iconComponent ? iconComponent() : null}</div>
              </div>

              {hasError ? (
                  <div className="input-label-container">
                      <Label text={errorMessage} danger fontSize={16} fontRegular />
                  </div>
              ) : null}
            </div>
        )
    }
}