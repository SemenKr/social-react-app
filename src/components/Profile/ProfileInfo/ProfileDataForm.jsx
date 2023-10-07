import React from 'react';
import styles from './ProfileDataForm.module.scss'
import {useForm, Controller} from "react-hook-form";
import {Button, Checkbox } from "@mui/material";
import CustomTextField from "../../ui/CustomTextField";


const ProfileDataForm = ({profile, saveProfileData, setEditMode}) => {

    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm({
        defaultValues: {
            fullName: profile.fullName || '',
            lookingForAJobDescription: profile.lookingForAJobDescription || '',
            lookingForAJob: profile.lookingForAJob || false,
            aboutMe: profile.aboutMe || '',
            // Далее идут поля контактов, вы можете использовать аналогичный подход для каждого из них
            contacts: {
                github: profile.contacts?.github || '',
                vk: profile.contacts?.vk || '',
                facebook: profile.contacts?.facebook || '',
                instagram: profile.contacts?.instagram || '',
                twitter: profile.contacts?.twitter || '',
                website: profile.contacts?.website || '',
                youtube: profile.contacts?.youtube || '',
                mainLink: profile.contacts?.mainLink || '',
            },
        }
    })

    const isName = (value) => {
        // Your validation logic here
        return value.length > 0;
    }

    const onSubmit = data => {
        saveProfileData(data)
        setEditMode(false)

        console.log(' OnSubmit',data);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

            <CustomTextField
                name="fullName"
                control={control}
                rules={{
                    required: 'Name is required',
                    validate: isName,
                }}
                label={profile.fullName ? profile.fullName : "Name"}
                error={!!errors.fullName}
                helperText={errors.fullName ? errors.fullName.message : ''}
            />

            <label htmlFor="lookingForAJob">
                <Controller
                    name="lookingForAJob"
                    control={control}
                    render={({field }) => (
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
                error={!!errors.lookingForAJobDescription}
                helperText={errors.lookingForAJobDescription ? errors.lookingForAJobDescription.message : ''}
            />

            {profile.contacts &&
                <div>Contacts:
                    <ul>
                        {Object.keys(profile.contacts).map((key) => {
                            return (
                                <li key={key}>
                                    <CustomTextField
                                        name={'contacts.' + key}
                                        control={control}
                                        rules={{

                                        }}
                                        label={key}
                                        error={!!errors.key}
                                        helperText={errors.key ? errors.key.message : ''}
                                    />
                                </li>

                                )

                        })}

                    </ul>
                </div>
            }

            <Button type={"submit"} variant="contained">save</Button>
        </form>
    )
}

export default ProfileDataForm;
