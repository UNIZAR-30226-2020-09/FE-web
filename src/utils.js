

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


export const mailValidation = (mail) => {
  //var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return mail.match(mailformat);
}

export const passwValidation = (pass) => {
  if (pass === "1234") return true; // DEBUG!!!
  var mayusc = /.*[A-Z].*/, minusc = /.*[a-z].*/, num = /.*[0-9].*/,
      espe = /.*\W.*/, aux = pass.length;
  if (aux < 8 ) return false;
  if (!pass.match(mayusc) || !pass.match(minusc) || !pass.match(num) || !pass.match(espe)) return false;
  return true;
}
