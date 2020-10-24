import React,{Component} from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';
import Button from '../button/Button';
import './FlashMessage.scss';

export default class FlashMessage extends Component{
    constructor(props){
        super(props);
        this.state = {
            isActive: true
        }
    }

    handleClickClose = () => {
        const {onClose} = this.props;
        onClose();
        this.setState({isActive: false})
    }

    render(){
        const {isActive} = this.state;
        const {width,message,margin,error,success} = this.props;

        const flashMessageStyles = classnames({
            'flash-message-wrapper':true,
            error,
            success,
            closed: !isActive
        });

        return (
            <div className={flashMessageStyles} style={{maxWidth:width,margin}}>
                <span className="flash-message">{message}</span>
                <div className="button-container">
                    <Button type='button' height={26} width={26} link onClick={this.handleClickClose}>
                        <Icon fill='#ffffff' icon='close' height={26} width={26}  />
                    </Button>
                </div>
            </div>
        )
    }
}