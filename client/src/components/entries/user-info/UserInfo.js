import React,{Component} from 'react';
import classnames from 'classnames';
import Tag from '../../others/tag/Tag';
import Label from '../../others/label/Label';
import Sketch from '../../others/sketch/Sketch';
import Loading from '../../others/loading/Loading';
import DropDownMenu from '../../others/drop-down-menu/DropdownMenu';
import ProfilePicture from '../../others/profile-picture/ProfilePicture';
import './UserInfo.scss';

export default class UserInfo extends Component{
    constructor(props){
        super(props);
        this.state = { actionDropdownIsOpen: false}
    }

    onChangeDropDownActions = status => {
        this.setState({ actionDropdownIsOpen: status })
    }

    render(){
        const {actionDropdownIsOpen} = this.state;
        const {isFetching,isFetchingAction,profile,title,desc,column,rightLabel,wrapperStyle,sketchDark,tagInfo,actions} = this.props;
        const userInfoContainerStyles = classnames({
                        'user-info-container': true,
                         column
                        })
        const actionContainerStyles = classnames({
                       'actions-container': true,
                        visible: actionDropdownIsOpen
                     })
        
        if(isFetching){
            return(
                <div className='user-info-container' style={wrapperStyle}>
                    <div className={userInfoContainerStyles}>
                        <Sketch height={profile.height} width={profile.width} circle dark={sketchDark} />
                        <div className="labels-container">
                            {title ? (<Sketch height={8} width={90} margin={title.margin} dark={sketchDark} />) : null}
                            {desc ? (<Sketch height={8} width={60} margin={desc.margin} dark={sketchDark} />) : null}
                        </div>
                    </div>
                </div>
            )
        }

       return (
           <div className='user-info-wrapper' style={wrapperStyle}>
               <div className={userInfoContainerStyles}>
                   <ProfilePicture {...profile} />
                   <div className='labels-container'>
                       <Label fontSemiBold dark breakWord {...title} />
                       <Label fontRegular dark breakWord {...desc} />
                   </div>
               </div>

               {isFetchingAction ? (
                   <div className="info-container">
                       <div className="loading-container">
                           <Loading type="donut" />
                       </div>
                   </div>
               ) : (
                   <div className="info-container">
                       {rightLabel ? (<Label fontRegular text={rightLabel} fontSize={13} alignRight width={100} margin="0px 0px 5px 0px" />) : null}
                       <div className="footer-container">
                           {tagInfo ? (<Tag success text={tagInfo} />) : null}
                           {actions ? (
                               <div className={actionContainerStyles}>
                                   <DropDownMenu
                                        options={actions.options}
                                        icon={{fill:'#555657',icon:'arrow-down',height: '1005',width: '100%'}}
                                        onChange={this.onChangeDropDownActions}
                                        marginButton="0px 0px 0px 8px"
                                   />
                               </div>
                           ): null}
                       </div>
                   </div>
               )}
           </div>
       ) 
    }
} 