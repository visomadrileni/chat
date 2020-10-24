import React,{Component} from 'react';
import classnames from 'classnames';
import Label from '../../others/label/Label';
import Loading from '../../others/loading/Loading';
import DropDownMenu from '../../others/drop-down-menu/DropdownMenu';
import './Message.scss';

export default class Message extends Component {
    constructor(props){
        super(props);
        this.state = { actionDropdownIsOpen: false }
    }

    onChangeDropDownActions = status => {
        this.setState({actionDropdownIsOpen: status })
    }

   render(){
       const {actionDropdownIsOpen} = this.state;
       const {right,left,text,time,handleDelete,isFetchingAction} = this.props;
       const messageStyles = classnames({
                        message: true,
                        fadeIn:true,
                        right,
                        left
                    });
       const actionsContainerStyles = classnames({
                 'actions-container': true,
                 active: actionDropdownIsOpen
              })
       const labelsParams = {};
       if(right){ labelsParams.defaultLabel = true; }

       return (
           <div className={messageStyles}>
               <Label fontSemiBold text={text} fontSize={13} {...labelsParams} />
               {isFetchingAction ? (
                   <div className="message-footer-container">
                       <div className="loading-container">
                           <Loading type='donut' defaultLabel={right} />
                       </div>
                   </div>
               ) : (
                   <div className="message-footer-container">
                       <Label fontSemiBold text={time} fontSize={11} {...labelsParams} />
                       <div className={actionsContainerStyles}>
                           <DropDownMenu 
                              options={[{
                                     text: "delete chat",
                                     event: handleDelete
                                    }]}
                               icon={{
                                   fill: left ? '#b2b2b1' : '#ffffff',
                                   icon: 'arrow-down',
                                   width: '100%',
                                   height: '100%'
                                  }} 
                               onChange={this.onChangeDropDownActions}       
                            />
                       </div>
                   </div>
               )}
           </div>
       )
   }
}