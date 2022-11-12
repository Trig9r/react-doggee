import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Input, PasswordInput, Button, CheckBox } from '@components/UI';
import { useMutation, useQuery, useQueryLazy } from '@utils';

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
  const navigate = useNavigate();
  const [formValues, setFormValues] = React.useState({
    username: '',
    password: '',
    notMyComputer: false,
  });
  const [formErrors, setFormErrors] = React.useState<{ [key: string]: string | null }>({
    username: null,
    password: null,
  });

  const { mutation: authMutation, isLoading: authLoading } = useMutation<typeof formValues, User>(
    'http://localhost:3001/auth',
    'post',
  );

  const { query } = useQueryLazy<User>('http://localhost:3001/users');

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>DOGGEE</div>
        <form
          className={styles.form_container}
          onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            // const res = await authMutation(formValues);
            const res = await query();
            console.log(res.data);
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
              checked={formValues.notMyComputer}
              label="This is not my device"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.checked;
                setFormValues({ ...formValues, notMyComputer: value });
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
