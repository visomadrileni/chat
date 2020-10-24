import React,{Component} from 'react';
import classnames from 'classnames'
import UserInfo from '../user-info/UserInfo';
import './ConversationCard.scss';

export default class ConversationCard extends Component{
    render(){
       const {profile,title,desc,onClick,rightLabel,tagInfo,active,actions,isFetching,isFetchingAction} = this.props;
       const conversationCardStyles = classnames({'conversation-card': true, active });

        return (
            <div role="button" tabIndex="-1" className={conversationCardStyles} onClick={e => {e.preventDefault(); e.stopPropagation(); onClick(e); }}>
                <div className="conversation-card--container">
                    <UserInfo profile={profile} title={title} desc={desc} rightLabel={rightLabel} 
                              wrapperStyle={{width:'100%',justifyContent:'space-between'}} tagInfo={tagInfo}
                              actions={actions} isFetching={isFetching} isFetchingAction={isFetchingAction} />
                </div>
            </div>
        )      
    }
}