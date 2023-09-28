// TextFormField.js
import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const TextFormField = ({ name, control, label, variant, multiline, rows, errors }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    label={label}
                    variant={variant}
                    multiline={multiline}
                    rows={rows}
                    error={!!errors[name]}
                    helperText={errors[name] ? errors[name].message : ''}
                />
            )}
        />
    );
};

export default TextFormField;
