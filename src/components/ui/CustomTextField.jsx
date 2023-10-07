import React from 'react';
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const CustomTextField = ({ name, control, rules, label, defaultValue, error, helperText, ...props }) => {
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
