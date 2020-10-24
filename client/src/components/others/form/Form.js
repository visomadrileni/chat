import React,{Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {initForm,updateForm} from '../../../actions/form';

class Form extends Component{
	constructor (props) {
		super(props);

		this.state = {
			handleChange: this.handleChange,
			handleFocus: this.handleFocus,
			handleBlur: this.handleBlur,
			handleSubmit: this.handleSubmit,
			debounces: this.createDebounces()
		};
    }
    
    componentDidMount(){
        const {dispatch,values,formName} = this.props;
        dispatch(initForm(formName,{values,errors:{},touched:{}}))
    }

    createDebounces = () => {
        const {debounceValidation} = this.props;
        const debounces = {};
       
        _.mapKeys(debounceValidation,(value,key) => {
            debounces[key] = _.debounce(this.handleDebounceValidation,value);
        });
        return debounces;
    }

    handleDebounceValidation = (key,value) => {
        const formData = this.getFormData();
        const {errors} = formData;
        const {validateAsync,formName} = this.props;
        
        if(!errors[key]){
            validateAsync(key,value,formName);
            this.validateForm(true,[key]);
        }
    }

    getFormData = () => {
        const {formData,formName} = this.props;
        return formData[formName];
    }
   
    validateForm = (resetErrors,keys) => {
         const {validate} = this.props;
         const formData = this.getFormData();
         const {values,errors} = formData;

         this.updateFormData({errors: validate ? validate(values,errors,resetErrors,keys) : {} })
    }

    updateFormData = params => {
       const {dispatch,formName} = this.props;
       dispatch(updateForm(formName,{...params}))
    }

    setTouched = (keys) => {
       const formData = this.getFormData();
       const {touched} = formData;
   
       keys.forEach(key => { touched[key] = true; });
       this.updateFormData({touched});
    }

    getMyFormParams = () => {
        const myFormParams = this.getFormData() || {values:{},errors:{},touched:{}};
        return myFormParams;
    }

    handleChange = e => {
        e.preventDefault();
        const {name:key,value} = e.target;
        const formData = this.getFormData();
        const {values} = formData;
        values[key] = value;
        const {debounces} = this.state;
        const debounce = debounces[key];

        this.updateFormData({values});
        this.setTouched([key]);
        this.validateForm(true,[key]);
        if(debounce) debounce(key,value);
    }

    handleFocus = e => {
        e.preventDefault();
        const {name:key} = e.target;
        this.validateForm(false,[key]);
    }

    handleBlur = e => {
        e.preventDefault();
        const {name:key} = e.target;
        this.setTouched([key]);
        this.validateForm(false,[key]);
    }

    handleSubmit = e => {
        e.preventDefault();
        const {handleSubmit,formName} = this.props;
        const formData = this.getFormData();
        const {values,errors} = formData;

        this.validateForm(false,_.keys(values));
        this.setTouched(_.keys(values));
        if(_.isEmpty(errors)){
            handleSubmit(values,formName);
        }
    }


    render(){
        const {render} = this.props;
        const myFormParams = this.getFormData();
        
        return (
            <div>
                {render({...this.state,form:{...myFormParams}})}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    formData: state.form
})

export default connect(mapStateToProps)(Form);