import React,{Component} from 'react';
import classnames from 'classnames';
import Label from '../label/Label';
import './ProfilePicture.scss';

export default class ProfilePicture extends Component{
    createAcronym = (param) => {
        return (param || '').toUpperCase().slice(0, 2);
    }

    render(){
        const {color,height,width,label,backgroundColor,labelFontSize} = this.props;
        const profilePictureStyles = classnames({
            'profile-picture': true,
            fadeIn: true
        });
        
        return (
            <div className={profilePictureStyles} style={{height,width,color,backgroundColor}}>
                <Label fontBold text={this.createAcronym(label)} fontSize={labelFontSize} />
            </div>
        )
    }
}