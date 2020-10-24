import React,{Component} from 'react';
import Label from '../../others/label/Label';
import './TimeTag.scss';

export default class TimeTag extends Component{
    render(){
        const {text} = this.props;

        return (
            <div className="time-tag">
               <Label fontBold defaultLabel text={text.toUppercase()} fontSize={10} margin="0px 0px 0px 0px" />
            </div>
        )
    }
}