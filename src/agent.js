import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
//import { request } from 'https';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://pandorapp.herokuapp.com/api';

//const encode = encodeURIComponent;
const responseBody = res => {
  let response = res.body;
  if (response === null) {response = {}}
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
    requests.del(`/usuarios/eliminar`),
  login2fa: (mail, masterPassword, verificationCode) =>
   requests.post('/usuarios/loginCon2FA', {mail:mail, masterPassword: masterPassword, verificationCode: verificationCode})
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
    requests.post(`/contrasenya/listarNoCompartidas`, { masterPassword: mp }),
  filtrar: (mp,id) =>
    requests.post(`/contrasenya/listarPorCategoria`, { masterPassword: mp, idCat: id }),
  del: (cat) =>
    requests.del(`/contrasenya/eliminar`,cat),
  gen: (min,may,num,spec,long) =>
    requests.post(`/contrasenya/generar`,{minus: min, mayus: may, numbers: num, specialCharacters: spec, length:long})
}

const Grupales = {
  create: (name, pass, time, cat, text, user, users) =>
    requests.post(`/grupo/insertar`, { passwordName: name,
      password: pass, expirationTime: time, passwordCategoryId: cat,
      optionalText: text, userName: user, usuarios: users }),
  listar: () =>
    requests.get(`/grupo/listar`),
  modify: (passId,name,pass,time,text,user,users) =>
    requests.post(`/grupo/modificar`, { id: passId,passwordName: name,
      password: pass, expirationTime: time, optionalText: text, userName: user,usuarios: users })
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
  StatsAgent,
  Grupales
};
export const setToken = (_token) => { token = _token; }
export const getToken = () => { return token; }
