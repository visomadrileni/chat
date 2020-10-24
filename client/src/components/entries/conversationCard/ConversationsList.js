import React,{Component} from 'react';
import Label from '../../others/label/Label';
import ConversationCard from './ConversationCard';
import ConversationCardSketch from './ConversationCardSketch';
import './ConversationsList.scss';

export default class ConversationsList extends Component{
    conversationsContent = () => {
        const {items,isFetching,emptyMessage,onClickItem,onDeleteItem,deleteDropDownMessage} = this.props;
        if(isFetching){
            return (
                <div>
                    <ConversationCardSketch />
                    <ConversationCardSketch />
                    <ConversationCardSketch />
                </div>
            )
          }
       
       if(items.length <= 0){
           return (
               <Label fontRegular text={emptyMessage} alignItems fontSize={16} margin="50px 0px 0px 0px" />
           )
       }
       
       return (
           <div>
               {items.map((item,key) => {
                   const {desc,nickname,active,unreadMessages,profileColor,rightLabel,isFetchingAction} = item;
                   return (
                       <ConversationCard 
                              key={key}
                              onClick={() => {onClickItem(item)}}
                              profile={{label:nickname,height:40,width:40,backgroundColor: profileColor,color:'white',labelFontSize:12}}
                              title={{text:nickname,fontSize:13,maxWidth:76,margin:'0px 0px 0px 14px'}}
                              desc={{text:desc,fontSize:13,maxWidth:76,margin:'0px 0px 0px 14px'}}
                              rightLabel={rightLabel}
                              tagInfo={unreadMessages}
                              active={active}
                              isFetchingAction={isFetchingAction}
                              actions={{
                                  options: [{
                                        text: deleteDropDownMessage,
                                        event: () => { onDeleteItem(item) }
                                  }]
                              }}
                       />
                   )
               })}
           </div>
       )
    } 

   
    render(){
        return (
            <div className="conversations-list-container">
                {this.conversationsContent()}
            </div>
        )
    }
}