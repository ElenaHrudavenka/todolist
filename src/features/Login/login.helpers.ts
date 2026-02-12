import { FormikErrorType, LoginFormValues } from "./login.types";



export const validateEmail = (values: LoginFormValues): FormikErrorType => {
  const errors: FormikErrorType = {};
  if (!values.email) {
    errors.email = 'Email field is required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Password field is required';
  } else if (values.password.length < 3) {
    errors.password = 'Password is too short';
  }
  return errors;
}