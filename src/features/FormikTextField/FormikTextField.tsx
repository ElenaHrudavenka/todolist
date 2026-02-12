import { TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';

type FormikTextFieldProps = TextFieldProps & {
  name: string;
};

export const FormikTextField = ({ name, ...props }: FormikTextFieldProps) => {
  const [field, meta] = useField(name);

  const isError = meta.touched && Boolean(meta.error);

  return (
    <TextField
      {...field}
      {...props}
      error={isError}
      helperText={isError ? meta.error : ''}
      fullWidth
      margin="normal"
    />
  );
};
