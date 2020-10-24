import React,{Component} from 'react';
import classnames from 'classnames';
import './Label.scss';

export default class Label extends Component{
    render(){
        const {text,danger,fontSize,defaultLabel,dark,fontBold,fontSemiBold,fontMedium,fontRegular,margin,breakWord,maxWiidth,alignCenter,alignRight,width} = this.props;
        const spanClassName = classnames({
            label: true,
            fadeIn: true,
            danger,
            dark,
            'font-bold': fontBold,
            'font-semi-bold': fontSemiBold,
            'font-medium':fontMedium,
            'font-regular': fontRegular,
            'break-word': breakWord,
            'align-center': alignCenter,
            'align-right': alignRight,
            default: defaultLabel
        });
    
        const spanStyles = {margin,fontSize,maxWiidth,width};

        return (
            <span className={spanClassName} style={spanStyles}>{text}</span>
        )
    }
}