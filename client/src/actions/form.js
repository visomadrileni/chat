import {INIT_FORM,UPDATE_FORM,SET_FORM_ERROR} from './types';

export const initForm = (formName,data) => {
    return {
        type: INIT_FORM,
        formName,
        data
    }
}

export const updateForm = (updateForm,data) => {
    return {
        type: UPDATE_FORM,
        updateForm,
        data
    }
}

export const setFormError = (setForm,data) => {
    return {
        type: SET_FORM_ERROR,
        setForm,
        data
    }
}