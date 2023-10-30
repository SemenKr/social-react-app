import {FC, useState} from 'react';
import styles from './ProfileDataForm.module.scss'
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {Button, Checkbox, TextField} from "@mui/material";
import CustomTextField from "../../ui/CustomTextField.tsx";
import * as yup from 'yup';
import {ProfileType} from "../../../types/types";

// Определите интерфейс для свойств компонента
interface ProfileDataFormProps {
    profile: ProfileType;
    saveProfileData: (data: ProfileType) => void;
    setEditMode: (editMode: boolean) => void; // Замените на более конкретный тип, если необходимо
}
const ProfileDataForm: FC<ProfileDataFormProps> = ({ profile, saveProfileData, setEditMode }) => {
    // Состояние для отслеживания ошибок в полях контактов
    const [contactErrors, setContactErrors] = useState({});

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

    const isName = (value: string) => {
        return value.length > 0;
    };

    const urlValidationSchema = yup.string().url('Invalid URL format');
    const onSubmit: SubmitHandler<ProfileType> = async (data) => {
        // Проверяем ошибки в полях контактов
        const contactFieldErrors = {};

        for (const key in data.contacts) {
            const contactValue = data.contacts[key];
            try {
                await urlValidationSchema.validate(contactValue);
            } catch (error) {
                contactFieldErrors[key] = error.message;
            }
        }

        // Устанавливаем ошибки в состояние
        setContactErrors(contactFieldErrors);

        // Если есть ошибки в полях контактов, не отправляем данные
        if (Object.keys(contactFieldErrors).length > 0) {
            return;
        }

        saveProfileData(data);
        setEditMode(false);

        console.log('OnSubmit', data);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <CustomTextField
                name="fullName"
                control={control}
                rules={{
                    required: 'Name is required',
                    validate: isName,
                }}
                label={profile.fullName ? profile.fullName : 'Name'}
                error={!!errors.fullName}
                helperText={errors.fullName ? errors.fullName.message : ''}
            />

            <label htmlFor="lookingForAJob">
                <Controller
                    name="lookingForAJob"
                    control={control}
                    render={({ field }) => (
                        <Checkbox {...field} id="lookingForAJob" color="primary" />
                    )}
                />
            </label>

            <CustomTextField
                name="lookingForAJobDescription"
                control={control}
                rules={{}}
                label="Looking for a job description"
                error={!!errors.lookingForAJobDescription}
                helperText={errors.lookingForAJobDescription ? errors.lookingForAJobDescription.message : ''}
            />

            {profile.contacts && (
                <div>
                    Contacts:
                    <ul>
                        {Object.keys(profile.contacts).map((key) => {
                            const contactName = `contacts.${key}`;
                            return (
                                <li key={key}>
                                    <Controller
                                        name={contactName}
                                        control={control}
                                        defaultValue={profile.contacts[key] || ''}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={key}
                                                variant="outlined"
                                                error={!!errors[contactName] || !!contactErrors[key]}
                                                helperText={errors[contactName] ? errors[contactName].message : contactErrors[key] || ''}
                                            />
                                        )}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
            <Button type="submit" variant="contained">
                save
            </Button>
        </form>
    );
};

export default ProfileDataForm;
