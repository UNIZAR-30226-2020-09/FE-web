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
  req.set('Accept', 'application/json').ok(res => true);
  // console.log("Token:", token);
  if (token) {
    req.set('Authorization', `${token}`);
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

const Categorias = {
  create: (cat_name) =>
    requests.post(`/categorias/insertar`, { categoryName: cat_name }),
  update: (cat_id, cat_name) =>
    requests.post(`/categorias/modificar`, { id: cat_id, categoryName: cat_name }),
  del: (cat_id) =>
    requests.del(`/categorias/eliminar`, { id: cat_id }),
  list: () =>
    requests.get(`/categorias/listar`)
}

const Contraseñas = {
  create: (name, pass, time, cat, text, user) =>
    requests.post(`/contrasenya/insertar`, { passwordName: name, password: pass,
      expirationTime: time, passwordCategoryId: cat, optionalText: text, userName: user }),
}

export {
  Usuario,
  ContactaAgent,
  Categorias,
  Contraseñas
};
export const setToken = (_token) => { token = _token; }
export const getToken = () => { return token; }
