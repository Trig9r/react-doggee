export const setCookie = (name: string, value: string | number | boolean , props: $TSFixMe = {}) => {
  const cookieOptions: $TSFixMe = props;
  
  if (typeof props.expires === 'number' && props.expires) {
    const date = new Date();
    date.setTime(date.getTime() + props.expires * 1000);
    cookieOptions.expires = date;
  }

  if (props.expires && props.expires.toUTCString) {
    cookieOptions.expires = props.expires.toUTCString();
  }

  const cookieValue = encodeURIComponent(value);
  let updatedCookie = name + '=' + cookieValue;

  for (const propName in props) {
    if (propName) {
      updatedCookie += '; ' + propName;

      const propValue = props[propName];

      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
  }

  document.cookie = updatedCookie;
};