import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { validateEmail } from './login.helpers';
import { FormikProvider, useFormik } from 'formik';
import { setIsLoggedInTC } from '../../state/auth-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../app/store';
import { Navigate } from 'react-router-dom';
import { LightTooltip } from '../../components/LightTooltip/LightTooltip'
import { Link, Paper, Typography } from '@mui/material';
import { LoginFormValues } from './login.types';
import { FormikTextField } from '../FormikTextField/FormikTextField';

export const Login = () => {
  const dispatch = useDispatch();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: validateEmail,
    onSubmit: (values) => {
      dispatch(setIsLoggedInTC({ ...values, captcha: true }));
      formik.resetForm();
    },
  });

  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn
  );

  if (isLoggedIn) {
    return <Navigate to='/' />;
  }

  const onClickDemoHandler = () => {
    formik.setFieldValue('email', 'free@samuraijs.com');
    formik.setFieldValue('password', 'free');
    formik.submitForm();
  }

  return (
    <Grid container justifyContent={'center'}>
      <Paper sx={{ padding: '35px 25px', marginTop: '10vh' }}>
        <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>You can take a look at the project by using <br /> the demo account or by registering.</p>
            </FormLabel>
            <FormGroup>
              <FormikTextField
                name="email"
                label="Email"
                autoComplete="email"
              />
              <FormikTextField
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                label={'Remember me'}
                control={
                  <Checkbox
                    checked={formik.values.rememberMe}
                    {...formik.getFieldProps('rememberMe')}
                  />
                }
              />
              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Login
              </Button>
              <LightTooltip
                title={<Typography>Use these public credentials to log in to the demo account</Typography>}
                placement='top'
              >
                <Button
                  type={'button'}
                  variant={'contained'}
                  color={'primary'}
                  onClick={onClickDemoHandler}
                  style={{ margin: '10px 0px', }}>
                  Use Demo Account
                </Button>
              </LightTooltip>
              <p>
                {`Don't have an account? `}
                <Link
                  href={'https://social-network.samuraijs.com/'}
                  sx={{
                    textDecoration: 'none',
                    color: '#004ba0',
                    '&:hover': {
                      fontWeight: 'medium',
                    },
                  }}
                  target={'_blank'}
                  rel="noopener noreferrer"
                >
                  Register
                </Link></p>
            </FormGroup>
          </FormControl>
        </form>
        </FormikProvider>
      </Paper>
    </Grid >
  );
};
