

/* History */
//import createHistory from 'history/createBrowserHistory'; // Warning deprecated
import { createBrowserHistory as createHistory } from 'history';

export const history = createHistory();


/* Middleware */
/* ssessionStorage */

const cookie = "pandora-react";
let ck = {
  user: null
};
export const Cookie = {
  set: (state) => {
    let update = false;
    // Para cada elemento de 'state' que esté en ck, se actualiza el valor de ck
    for (let v in state) {
      if (v in ck && state[v] !== ck[v]) {
        update = true;
        ck[v] = state[v]
      }
    }
    // Si se ha modificado algo de ck, actualizamos cookie
    if (update) window.localStorage.setItem(cookie, JSON.stringify(ck))
  },
  get: () => {
    let c = JSON.parse(window.localStorage.getItem(cookie));
    if (c !== null) {
      for (let v in c) if (v in ck && c[v] !== ck[v]) ck[v] = c[v];
    }
    return ck;
  },
  clear: () =>
    window.localStorage.setItem(cookie, null),
  confirm: (ev) => {
    if (ev.key === cookie) {
      ck = JSON.parse(ev.newValue);
      return ck;
    }
  }
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

export const truncateText = (text, maxLength) => {
  var truncated = text;
  if (text.length > maxLength) {
      truncated = truncated.substr(0,maxLength) + '...';
  }
  return truncated;
}
