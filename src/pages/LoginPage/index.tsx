import React from 'react';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

import styles from './LoginPage.module.css';

const validateLoginForm = (name: string, value: string) => {
  if (!value) return `${name} is required`;
  return null;
};

export const LoginPage = () => {
  const [formValues, setFormValues] = React.useState({ username: '', password: '' });
  const [formErrors, setFormErrors] = React.useState<{ [key: string]: string | null }>({
    username: null,
    password: null,
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>DOGGEE</div>
        <div className={styles.form_container}>
          <div className={styles.input_container}>
            <Input
              value={formValues.username}
              placeholder="username"
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
            <Input
              type="password"
              value={formValues.password}
              placeholder="password"
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
          <div>
            <Button>Sign in</Button>
          </div>
        </div>
        <div className={styles.sign_up}>Create new account</div>
      </div>
    </div>
  );
};
