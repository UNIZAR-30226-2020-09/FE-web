import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://pandorapp.herokuapp.com/api';

//const encode = encodeURIComponent;
const responseBody = res => {
  let response = res.body;
  response.statusType = res.statusType;
  response.status = res.status;
  return response;
};

let token = null;
const tokenPlugin = req => {
  req.set('accept', 'application/json').ok(res => true);
  if (token) {
    req.set('authorization', `${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Usuario = {
  registro: (mail, password) =>
    requests.post(`/usuarios/registro`, { mail: mail, masterPassword: password }),
  login: (email, password) =>
    requests.post('/usuarios/login', { mail: email, masterPassword: password }),
  logout: () =>
    null
};

const ContactaAgent = {
  contactar: (mail_, body_) =>
    requests.post(`/mensaje`, { mail: mail_, body: body_ })
}

export {
  Usuario,
  ContactaAgent
};
export const setToken = (_token) => { token = _token; }
