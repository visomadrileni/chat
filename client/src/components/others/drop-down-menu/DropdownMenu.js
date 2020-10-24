import React,{Component} from 'react';
import {Manager,Reference,Popper} from 'react-popper';
import onClickOutside from 'react-onclickoutside';
import Icon from '../icon/Icon';
import Label from '../label/Label'
import Button from '../button/Button';
import './DropdownMenu.scss';

 class DropDownMenu extends Component{
     constructor(props){
         super(props);
         this.dropDownWrapper = React.createRef();
         this.state = { isOpen: false}
     }

     handleClickOutside = e => {
         const {isOpen} = this.state;
         if(this.dropDownWrapper.current){
             if(!this.dropDownWrapper.current.contains(e.target)){
                 if(isOpen){
                     this.changeDropDownStatus(false,false);
                 }
             }
         }
     }

     changeDropDownStatus = (toggle,newIsOpen) => {
          const {isOpen} = this.state;
          const {onChange} = this.props;

          const isOpenState = toggle ? (!isOpen) : (newIsOpen);
          if(onChange){ onChange(isOpenState) }
          this.setState({ isOpen: isOpenState })
     }

     render(){
        const {isOpen} = this.state;
        const {options,icon,marginButton} = this.props;

        return (
            <div className="drop-down-menu-wrapper" ref={this.dropDownWrapper}>
                <Manager>
                    <Reference>
                        {({ref}) => (
                            <Button type='button' width={icon.width} height={icon.height} margin={marginButton} link setRef={ref} onClick={() => this.changeDropDownStatus(true)}>
                                <Icon {...icon} />
                            </Button>
                        )}
                    </Reference>
                    {isOpen && (
                        <Popper placement="bottom-end">
                            { ({ref,style,placement}) => (
                                <div style={style} ref={ref} className="drop-down-menu fadeIn" data-placement={placement}>
                                   <ul>
                                       {options.map((item,index) => (
                                           <li key={index}>
                                              <Button link onClick={() => {
                                                  this.changeDropDownStatus(false,false);
                                                  item.event();
                                                  }}>
                                                  <Label regular dark breakWord alignCenter text={item.text} fontSize={14} />
                                              </Button>
                                           </li>
                                       ))}
                                   </ul>
                                </div>
                            )}
                        </Popper>
                    )}
                </Manager>
            </div>
        )
     }
 }

 export default onClickOutside(DropDownMenu);