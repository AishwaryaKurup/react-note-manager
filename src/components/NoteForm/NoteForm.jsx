import { ButtonPrimary } from '../ButtonPrimary/ButtonPrimary';
import { Pencil, Trash2 } from "lucide-react";
import s from './style.module.css';
import { useState } from 'react';
import { ValidatorService } from '../../services/validator';
import { FieldError } from '../FieldError/FieldError';

const VALIDATOR = {
    title: (value) => {
        return ValidatorService.min(value,3) || ValidatorService.max(value,20);
    },
    content: (value) => {
        return ValidatorService.min(value,2);
    }
}



export function NoteForm({ isEditable=true, note, title, onClickEdit, onClickDelete, onSubmit}){
    const [formValues,setFormValues] = useState({title:'',content:''});

    const [formErrors, setFormErrors] = useState({title:true, content:true});

    const updateFormValues = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormValues({...formValues, [name]:value });
        validate(name,value);
    };

    const validate = (fieldName, fieldValue) => {
        setFormErrors({...formErrors, [fieldName]:VALIDATOR[fieldName](fieldValue)});
    };

    const hasError = () => {
        for (const fieldName in formErrors){
            if(formErrors[fieldName]){
                return true
            }
        }
        return false
    }

    const actionIcons = (
        <>
        <div className='col-1'>
           {onClickEdit && <Pencil onClick={onClickEdit} className={s.icon}/>}
        </div>
        <div className='col-1'>
            {onClickDelete &&  <Trash2 onClick={onClickDelete} className={s.icon}/>}
        </div>
        </>
    );

    const titleInput = (
        <div className='mb-5'>
            <label className='form-label'>Title</label>
            <input onChange={updateFormValues} type='text' name='title' className='form-control'/>
            <FieldError msg = {formErrors.title}/>
        </div>
        
    );

    const contentInput = (
        <div className='mb-5'>
            <label className='form-label'>Content</label>
            <textarea onChange={updateFormValues} type='text' name='content' className='form-control' row='5'/>
            <FieldError msg = {formErrors.content}/>
        </div>
    );

    const submitBtn = (
        <div className={s.submit_btn}>
            <ButtonPrimary isDisabled={hasError()} onClick={()=> onSubmit(formValues)}>Submit</ButtonPrimary>
        </div>
    );

    return (
        <div className={s.container}>
            <div className = 'row justify-content-space-between'>
                <div className='col-10'>
                    <h2 className='mb-3'>{title}</h2>
                </div>
                {actionIcons}
            </div>

            <div className={`mb-3 ${s.title_input_container}`}>{isEditable && titleInput}</div>
            <div className='mb-3'>{isEditable ? contentInput : <pre className={s.content_style}>{note.content}</pre>}</div>
            {onSubmit && submitBtn}
        </div>
    );
}