import React,{Component} from 'react';
import Sketch from '../../others/sketch/Sketch';
import './ConversationCard.scss';

export default class ConversationCardSketch extends Component{
    render(){
        return (
            <div className="conversation-card">
                <div className="conversation-card--container">
                   <div className="user-info-sketch-container">
                       <Sketch height={40} width={40} circle />

                       <div>
                           <Sketch height={8} width={90} margin="0px 0px 0px 14px" />
                           <Sketch height={8} width={70} margin="8px 0px 0px 14px" />
                       </div>
                   </div>
                </div>
            </div>
        )
    }
}