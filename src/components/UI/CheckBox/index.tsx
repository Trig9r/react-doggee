import React from 'react';

import styles from './CheckBox.module.css';

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked: boolean;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ label, checked, ...props }) => {
  return (
    <label className={styles.checkbox_container}>
      <input className={styles.checkbox} type="checkbox" checked={checked} {...props} />
      <span className={styles.custom_checkbox} />
      <span className={styles.label}>{label}</span>
    </label>
  );
};
