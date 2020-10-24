import React,{Component} from 'react';
import classnames from 'classnames';
import Label from '../label/Label';
import './Tag.scss';

export default class Tag extends Component {
    render(){
        const {success,text} = this.props;
        const tagStyles = classnames({
                   tag:true,
                   fadeIn:true,
                   success
                });

        return (
            <div className={tagStyles}>
                <Label text={text} fontSize={12} width={18} />
            </div>
        )        
    }
}