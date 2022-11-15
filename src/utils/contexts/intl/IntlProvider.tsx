import React from 'react';

import { IntlContext } from './IntlContext';

interface IntlPropviderProps {
  children: any;
  locale: string;
  messages: Record<string, any>;
}

export const IntlProvider: React.FC<IntlPropviderProps> = ({ children, locale, messages }) => {
  const [intlValues, setIntlValues] = React.useState({ locale });

  return <IntlContext.Provider value={intlValues}>{children}</IntlContext.Provider>;
};
