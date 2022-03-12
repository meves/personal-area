type ValidatorType = (value: string) => undefined | string;

export const required: ValidatorType = (value) => value ? undefined : "The field required";

const minLengthValidator = (min: number): ValidatorType => (value) => 
    value && value.length >= min ? undefined : `Min length has to be ${min} symbols`;
 
export const minLength8 = minLengthValidator(8);
export const minLength6 = minLengthValidator(6);

const maxLengthValidator = (max: number): ValidatorType => (value) => 
    value && value.length <= max ? undefined : `Max length has to be ${max} symbols`;
export const maxLength20 = maxLengthValidator(20);
             
/* const maxLength: MinMaxType = max => value => 
    value && value.length <= max ? undefined : `Max length has to be ${max} or less symbols`

export const maxLength30 = maxLength(30)
export const maxLength300 = maxLength(300)

const minLength: MinMaxType = min => value => 
    value && value.length >= min ? undefined : `Characters has to be more than ${min}`

export const minLength6 = minLength(6) */