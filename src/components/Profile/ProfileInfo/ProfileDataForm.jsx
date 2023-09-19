import React from 'react';
import styles from './ProfileDataForm.module.scss'
import {useForm} from 'react-hook-form';

const ProfileDataForm = ({profile}) => {

    const {
        register,
        handleSubmit
    } = useForm({
        defaultValues: {
            name: ''
        }
    })
    
    const submit = data => {
        console.log(data);
    }

    const isName = data => {
        console.log('Вызвана');
        return true
    }
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(submit)}>
            <input type="text" {...register('name', {required: true, validate: isName})} />
            <button>Save</button>
        </form>
    )
}

export default ProfileDataForm;