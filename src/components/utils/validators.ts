export type FieldValidatorType = (value: string) => string | undefined;

export const required: FieldValidatorType = (value) => (value ? undefined : 'Required');

export const mustBeNumber: FieldValidatorType = (value) => (isNaN(Number(value)) ? 'Must be a number' : undefined);

export const minValue = (min: number): FieldValidatorType => (value: string) =>
    isNaN(Number(value)) || Number(value) >= min ? undefined : `Should be greater than ${min}`;

export const minLength = (min: number): FieldValidatorType => (value: string) => {
    if (value && value.length < min) {
        return `Minimum length is ${min} characters`;
    }
    return undefined;
};

export const maxLength = (max: number): FieldValidatorType => (value: string) => {
    if (value && value.length > max) {
        return `Must be ${max} characters or less`;
    }
    return undefined;
};

export const composeValidators = (...validators: FieldValidatorType[]): FieldValidatorType => (value: string) => {
    const errors = validators.map(validator => validator(value)).filter(error => error !== undefined);
    return errors[0]; // Возвращает первую ошибку или undefined, если ошибок нет
};
