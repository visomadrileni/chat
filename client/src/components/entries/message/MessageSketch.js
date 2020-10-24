import React,{Component} from 'react';
import classnames from 'classnames'
import Sketch from '../../others/sketch/Sketch';
import './Message.scss';

export default class MessageSketch extends Component{
    render(){
        const {right,left} = this.props;
        const messageStyles = classnames({
                     message: true,
                     fadeIn: true,
                     right,
                     left
                   })
                  
        return (
            <div className={messageStyles}>
                <Sketch height={8} width={90} />
                <Sketch height={6} width={70} />
            </div>
        )           
    }
}
