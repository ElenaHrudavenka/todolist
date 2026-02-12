export type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type FormikErrorType = Partial<LoginFormValues>;
