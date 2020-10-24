import React,{Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames'
import {initDrawer,closeDrawer} from '../../../actions/drawer'
import Icon from '../icon/Icon';
import Label from '../label/Label';
import Button from '../button/Button';
import './Drawer.scss';


class Drawer extends Component{
    componentDidMount(){
        const {drawerName} = this.props;
        initDrawer(drawerName)
    }

    handleGoBack = () => {
        const {drawerName} = this.props;
        closeDrawer(drawerName);
    }

    render(){
        const {title,drawerData,drawerName} = this.props;
        const {isOpen} = drawerData[drawerName] ? drawerData[drawerName] : {isOpen:false}
        const drawerStyles = classnames({drawer:true,open:isOpen});

         return (
             <div className={drawerStyles}>
                 {isOpen ? (
                     <div className="drawer-container">
                         <header className="header">
                             <Button type='button' width={26} height={26} link onClick={this.handleGoBack}>
                                <Icon fill="#ffffff" icon="arrow-left" width={26} height={26} />
                             </Button>
                             <Label fontSemiBold defaultLabel text={title} fontSize={16} margin="0px 0px 3px 15px" />
                         </header>
                     </div>
                 ) : null}
             </div>
         )
    }
}

const mapStateToProps = state => ({
    drawerData: state.drawer
})

export default connect(mapStateToProps,{initDrawer,closeDrawer})(Drawer)