import React,{Component} from 'react';
import classnames from 'classnames';
import './Sketch.scss';

export default class Sketch extends Component{
    render(){
        const {height,width,margin,circle,dark} = this.props;
        const sketchStyles = classnames({sketch:true,circle,dark});

        return (
            <div className='sketch-wrapper'>
                <div className={sketchStyles} style={{height,width,margin}}></div>
            </div>
        )
    }
}
