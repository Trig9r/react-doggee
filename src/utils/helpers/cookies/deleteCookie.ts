import {setCookie} from './setCookie';

export const deleteCookie = (name: string) => {
  setCookie(name, '', {expires: -1});
}