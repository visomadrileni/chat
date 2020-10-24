import React,{Component} from 'react';
import classnames from 'classnames';
import './Loading.scss';

export default class Loading extends Component{
    renderSpinner = (
        <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
        </div>
    );

    renderDotnut = () => {
         const {defaultLoading} = this.props;
         return (<div className={classnames({donut:true,default:defaultLoading})}></div>)
    }

    render(){
        const {type} = this.props;

        switch(type){
            case 'donut':
                return this.renderDotnut();
            case 'spinner':
                return this.renderSpinner();
                
            default:
                  return this.renderSpinner();    
        }
    }
}