

/* History */
//import createHistory from 'history/createBrowserHistory'; // Warning deprecated
import { createBrowserHistory as createHistory } from 'history';

export const history = createHistory();


/* Middleware */
/* ssessionStorage */

const cookie = "pandora-react";
export const Cookie = {
  set: (state) =>
    window.sessionStorage.setItem(cookie, JSON.stringify(state)),
  get: () =>
    JSON.parse(window.sessionStorage.getItem(cookie)),
  clear: () =>
    window.sessionStorage.setItem(cookie, null)
}
