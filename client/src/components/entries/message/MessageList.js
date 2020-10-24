import React,{Component} from 'react';
import _ from 'lodash';
import moment from 'moment';
import Message from './Message';
import MessageSketch from './MessageSketch';
import TimeTag from '../time-tag/TimeTag';
import './MessageList.scss';


export default class MessageList extends Component{
    getItems = () => {
        const {items} = this.props;
        const messages = [];

        const aggregatedItems = _.groupBy(items,item => {
            return moment(item.dataTime).utc().startOf('day').format();
           })

        _.mapKeys(aggregatedItems, (value,key) => {
            const  item = {items: value};
            const diff = moment(new Date()).diff(moment(key),'days');

            if(diff <= 6){
                if(diff === 0){
                    item.timeTag = 'today';
                } else if(diff === 1){
                    item.timeTag = 'yesterday';
                } else {
                    item.timeTag = moment(key).format('ddddd');
                }
              } else {
                item.timeTag = moment(key).format('DD/MM/YYYY');
             }

             messages.push(item);
         });
        
        return messages;
    }


    render(){
        const {isFetching,onMouseOver,onFocus,handleDeleteMessage} = this.props;
        const messages = this.getItems();

        if(isFetching){
            return (
                <div className="message-list">
                    <MessageSketch left />
                    <MessageSketch right />
                </div>
            )
        }

        return (
            <div className="message-list" onMouseOver={onMouseOver} onFocus={onFocus}>
                {messages.map((message,key) => {
                    const {timeTag,items} = message;
                    const components = [];
                    components.push(<TimeTag key={`time-tag${key}`} text={timeTag} />);

                    items.forEach((item,key) => {
                        const {_id,message,dateTime,currentUserIsSender,isFetchingAction} = item;
                        components.push(<Message key={`message${key}`} right={currentUserIsSender} left={!currentUserIsSender} 
                                                 text={message} time={moment(dateTime).format('HH:mm')} isFetchingAction={isFetchingAction} 
                                                 handleDelete={() => handleDeleteMessage(_id)} />)
                                      })

                    return (components);
                  })}
            </div>
        ) 
    }
}