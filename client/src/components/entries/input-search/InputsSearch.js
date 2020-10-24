import React,{Component} from 'react';
import _ from 'lodash';
import Icon from '../../others/icon/Icon';
import Input from '../../others/input/Input';

export default class InputSearch extends Component{
    debounceChange = _.debounce((value) => {
        const {handleChange} = this.props;
        handleChange(value);
    },300);

    componentWillMount(){
         this.debounceChange.cancel();
    }

    render(){
        return (
            <Input 
                    type='text'
                    maxLength={12}
                    search 
                    onChange={e => {
                        const {value} = e.target;
                        this.debounceChange(value)
                    }} 
                    iconComponent={() => {
                        return( <Icon fill="#555657" icon="search" height={28} width={28} margin="0px 0px 0px 2px" />)
                    }}/>
          )
    }
}