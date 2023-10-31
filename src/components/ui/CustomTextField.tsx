import {FC} from 'react';
import {Control, Controller, FieldValues, UseFormRegister} from "react-hook-form";
import {TextField, TextFieldProps} from "@mui/material";

interface CustomTextFieldProps {
    name: string;
    control: Control<FieldValues>;
    rules: Parameters<UseFormRegister<any>>[1]; // Тип для rules
    label: string;
    defaultValue?: string;
    error: boolean;
    helperText?: string;
}

const CustomTextField: FC<CustomTextFieldProps & TextFieldProps> = ({ name, control, rules, label, defaultValue, error, helperText, ...props }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
                <TextField
                    {...field}
                    label={label}
                    defaultValue={defaultValue}
                    variant="outlined"
                    error={!!error}
                    helperText={helperText}
                    {...props}
                />
            )}
        />
    );
}

export default CustomTextField;
