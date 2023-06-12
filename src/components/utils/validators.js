// const REQIRED_FIESLВ = 'Обязательное поле'


// export const required = (value) => {
//     if (value) return undefined;
//     return REQIRED_FIESLВ;
// }
// export const minValue = min => value =>
//     isNaN(value) || value >= min ? undefined : `Должно быть больше ${min}`
// export const maxValue = max => value =>
//     isNaN(value) || value <= max ? undefined : `Должно быть меньше ${max}`
//
// export const composeValidators = (...validators) => value =>
//     validators.reduce((error, validator) => error || validator(value), undefined);

export const required = value => (value ? undefined : 'Required')
export const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
export const minValue = min => value =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`

export const minLength = (min) => (value) => {
    if (value && value.length < min) {
        return `Минимальное колличество символов ${min}`;
    }
};

export const maxLength = (max) => (value) => {
    if (value && value.length > max) {
        return `Must be ${max} characters or less`;
    }
};
export const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)
