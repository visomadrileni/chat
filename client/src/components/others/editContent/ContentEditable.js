import React,{Component} from 'react';
import './ContentEditable.scss';

export default class ContentEditable extends Component{
    constructor(props){
        super(props);
        this.contentEditable = React.createRef();
    }

    handleKeyDown = e => {
        if(e.which === 13 && e.shiftKey === false){
            e.preventDefault();
            this.handleEnter();
            return false;
        }
    }

    handleEnter = () => {
        const {onEnter} = this.props;
        onEnter(this.contentEditable.current.textContent);
        this.contentEditable.current.textContent = '';
    }

    render(){
        const {onFocus} = this.props;
        
        return(
            <div
               className='content-editable'
               role='button'
               ref={this.contentEditable}
               onKeyDown={this.handleKeyDown}
               onFocus={onFocus}
            ></div>
        )
    }
}