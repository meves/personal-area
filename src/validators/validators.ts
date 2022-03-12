type ValidatorType = (value: string) => undefined | string;

export const required: ValidatorType = (value) => value ? undefined : "The field required";
