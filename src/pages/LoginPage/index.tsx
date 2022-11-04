import React from 'react';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

import './LoginPage.css';

export const LoginPage = () => {
  const [formValues, setFormValues] = React.useState({ username: '', password: '' });

  return (
    <div className="login_page">
      <div className="login_page_container">
        <div>header</div>
        <div className="login_page_form_container">
          <div className="login_page_input_container">
            <Input
              isError={true}
              helperText="validation"
              value={formValues.username}
              placeholder="username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormValues({ ...formValues, username: e.target.value })
              }
            />
          </div>
          <div className="login_page_input_container">
            <Input
              value={formValues.password}
              placeholder="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormValues({ ...formValues, password: e.target.value })
              }
            />
          </div>
          <div>
            <Button>Sign in</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
