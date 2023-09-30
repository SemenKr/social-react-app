import React from 'react';
import styles from './ProfileDataForm.module.scss'
import {useForm, Controller} from "react-hook-form";
import {Button, Checkbox, TextareaAutosize, } from "@mui/material";
import CustomTextField from "../../ui/CustomTextField";


const ProfileDataForm = ({profile}) => {

    const {
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

            <CustomTextField
                name="name"
                control={control}
                rules={{
                    required: 'Name is required',
                    validate: isName,
                }}
                label={profile.fullName ? profile.fullName : "Name"}
                defaultValue={profile.fullName}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
            />

            <p>{profile.lookingForAJobDescription}</p>
            <label htmlFor="lookingForAJob">ь б
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

            <CustomTextField
                name="lookingForAJobDescription"
                control={control}
                rules={{

                }}
                label="Looking for a job description"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
            />

            <Controller
                control={control}
                name={'aboutMe'}
                render={({field}) => <TextareaAutosize {...field} placeholder="About Me"/>}
            />
            <Button variant="contained">save</Button>
        </form>
    )
}

export default ProfileDataForm;