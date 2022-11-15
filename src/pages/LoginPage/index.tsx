import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Input, PasswordInput, Button, CheckBox } from '@components/UI';
import { useMutation, useQuery, useQueryLazy } from '@utils/hooks';
import { setCookie } from '@utils/helpers';
import { IntlContext } from '@utils/contexts';
import { api } from '@utils/api';

import styles from './LoginPage.module.css';

const validateLoginForm = (name: string, value: string) => {
  if (!value) return `${name} is required`;
  return null;
};

interface User {
  username: string;
  password: string;
  id: string;
}

export const LoginPage = () => {
  const intl = React.useContext(IntlContext);
  console.log(intl);

  const navigate = useNavigate();
  const [formValues, setFormValues] = React.useState({
    username: '',
    password: '',
    isNotMyDevice: false,
  });
  const [formErrors, setFormErrors] = React.useState<{ [key: string]: string | null }>({
    username: null,
    password: null,
  });

  const { mutation: authMutation, isLoading: authLoading } = useMutation<typeof formValues, User>(
    (values) => api.post('auth', values),
  );

  // const { isLoading, data } = useQuery<User[]>(() => api.get('users'));
  const { query } = useQueryLazy<User[]>(() => api.get('users'));
  //console.log('users', query);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>DOGGEE</div>
        <form
          className={styles.form_container}
          onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const res = await authMutation(formValues);
            if (res.success && formValues.isNotMyDevice) {
              setCookie('doggee-isNotMyDevice', new Date().getTime() + 30 * 60000);
            }
            // const res = await query();
            console.log(res);
          }}>
          <div className={styles.input_container}>
            <Input
              value={formValues.username}
              label="username"
              disabled={authLoading}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                setFormValues({ ...formValues, username: value });
                const errors = validateLoginForm('username', value);
                setFormErrors({ ...formErrors, username: errors });
              }}
              {...(!!formErrors.username && {
                isError: !!formErrors.username,
                helperText: formErrors.username,
              })}
            />
          </div>
          <div className={styles.input_container}>
            <PasswordInput
              value={formValues.password}
              label="password"
              disabled={authLoading}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                setFormValues({ ...formValues, password: value });
                const errors = validateLoginForm('password', value);
                setFormErrors({ ...formErrors, password: errors });
              }}
              {...(!!formErrors.password && {
                isError: !!formErrors.password,
                helperText: formErrors.password,
              })}
            />
          </div>
          <div className={styles.input_container}>
            <CheckBox
              disabled={authLoading}
              checked={formValues.isNotMyDevice}
              label="This is not my device"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.checked;
                setFormValues({ ...formValues, isNotMyDevice: value });
              }}
            />
          </div>
          <div>
            <Button isLoading={authLoading} type="submit">
              Sign in
            </Button>
          </div>
        </form>
        <div className={styles.sign_up} onClick={() => navigate('/registration')}>
          Create new account
        </div>
      </div>
    </div>
  );
};
