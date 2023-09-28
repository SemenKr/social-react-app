import React from 'react';
import styles from './ProfileDataForm.module.scss'
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {Checkbox, TextareaAutosize, TextField} from "@mui/material";
import TextFormField from "../../ui/TextFormField";


const ProfileDataForm = ({profile}) => {

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: {errors},
    } = useForm({
        defaultValues: {
            name: '',
            lookingForAJobDescription: '', // Add default value for lookingForAJobDescription
            aboutMe: '', // Add default value for aboutMe
        }
    })

    console.log(watch('example'))

    const isName = (value) => {
        // Your validation logic here
        return value.length > 0;
    }

    const onSubmit = data => {
        console.log(data);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="name"
                control={control}
                rules={{
                    required: 'Name is required',
                    validate: isName,
                }}
                render={({field}) => (
                    <TextField
                        {...field}
                        label="Name"
                        variant="outlined"
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ''}
                    />
                )}
            />
            <p>{profile.lookingForAJobDescription}</p>
            <label htmlFor="lookingForAJob">
                Looking for a job
                <Controller
                    name="lookingForAJob"
                    control={control}
                    render={({field}) => (
                        <Checkbox
                            {...field}
                            id="lookingForAJob"
                            color="primary"
                        />
                    )}
                />
            </label>

            <Controller
                name="lookingForAJobDescription"
                control={control}
                rules={{
                    required: 'Name is required',
                    validate: isName,
                }}
                render={({field}) => (
                    <TextField
                        {...field}
                        label="Looking for a job description"
                        variant="outlined"
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ''}
                    />
                )}
            />

            <TextFormField
                name={"lookingForAJobDescription"}
                control={control}
            />

            <Controller
                control={control}
                name={'aboutMe'}
                render={({field}) => <TextareaAutosize {...field} placeholder="About Me"/>}
            />
            <button>Save</button>
        </form>
    )
}

export default ProfileDataForm;