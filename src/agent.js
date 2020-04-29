import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
//import { request } from 'https';

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
  del: (url,body) =>
    superagent.del(`${API_ROOT}${url}?id=${body}`).use(tokenPlugin).then(responseBody),
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
    null,
  del: () =>
    requests.del(`/usuarios/eliminar`)
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
    requests.del(`/categorias/eliminar`,cat_id),
  list: () =>
    requests.get(`/categorias/listar`)
}

const Contrasenas = {
  create: (mp, name, pass, time, cat, text, user) =>
    requests.post(`/contrasenya/insertar`, { masterPassword: mp,
      passwordName: name, password: pass, expirationTime: time,
      passwordCategoryId: cat, optionalText: text, userName: user }),
  update: (mp, id, name, pass, time, cat, text, user) =>
    requests.post(`/contrasenya/modificar`, { masterPassword: mp, id: id,
      passwordName: name, password: pass, expirationTime: time,
      passwordCategoryId: cat, optionalText: text, userName: user }),
  listar: (mp) =>
    requests.post(`/contrasenya/listar`, { masterPassword: mp }),
  filtrar: (mp,id) =>
    requests.post(`/contrasenya/listarPorCategoria`, { masterPassword: mp, idCat: id }),
  del: (cat) =>
    requests.del(`/contrasenya/eliminar`,cat)
}

const StatsAgent = {
  list: () =>
    requests.get(`/estadisticas`)
}

export {
  Usuario,
  ContactaAgent,
  Categorias,
  Contrasenas,
  StatsAgent
};
export const setToken = (_token) => { token = _token; }
export const getToken = () => { return token; }
