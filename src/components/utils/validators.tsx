export type FieldValidatorType = (value: string) => string | undefined;
export type FieldCheckboxValidatorType = (value: boolean) => boolean | undefined;
interface FormDatavalidateEmailField {
    email: string;
    // Другие поля вашей формы
}


export const required: FieldValidatorType = (value) => (value ? undefined : 'Обязательное поле');
export const requiredCheckbox: FieldCheckboxValidatorType = (value) => (value === true ? undefined : false);

export const validateEmailField = (values: FormDatavalidateEmailField): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!values.email) {
        errors.email = 'Required 1';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

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

export const ErrorMessageWrapper = (msg: any) => {
    return (
        <div>
            <span className={""}>
                {msg}
            </span>
        </div>
    );
};
