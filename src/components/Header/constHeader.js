import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm.js';

/* OPCIONES NAVBAR SUPERIOR */
const top = [
  [
    {id: 1, name: 'Ayuda', link: '/about', icon: 'far fa-question-circle'}
  ], [
    {id: 2, name: 'Cerrar Sesión', link: {pathname: '/', state: {logout: true}}, icon: 'fas fa-sign-out-alt'},
    {id: 3, name: 'Ayuda', link: '/about', icon: 'far fa-question-circle'}
  ]
];

/* OPCIONES NAVBAR IZQUIERDO */
const left = [
  {id: 4, name: 'Inicio', link: '/home', icon: 'fas fa-home'},
  {id: 5, name: 'Mis Contraseñas', link: '/passwords', icon: 'fas fa-key'},
  {id: 6, name: 'Ajustes', link: '/settings', icon: 'fas fa-cog'},
  {id: 7, name: 'Sobre Pandora', link: '/about', icon: 'fas fa-info-circle'}
];

/* Map function -> list items */
function map_item(obj, props, liclass){
  let loc = props.currentlocation;
  return (
    <li key={obj.id} className={liclass + (obj.link !== loc ? "" : " active")}>
      <Link to={obj.link}>
        <span className={obj.icon}/>
        <i>{obj.name}</i>
      </Link>
    </li>
  );
}

const OptionsTop = props => {
  if (props.mobile) return null;
  let user = props.user !== null? 1:0;

  return (
    <div className="collapse">
      <ul>
        { user ? null:
          <li> <LoginForm setUser={props.setUser} li_item={"nav-top-item"}/> </li>
        }
        {top[user].map((opt) => map_item(opt, props, "nav-top-item"))}
      </ul>
    </div>
  );
};

const OptionsLeft = props => {
  if (props.user === null && !props.mobile) return null;
  let cls = "nav-vertical"
  if (props.mobile) cls += " responsive";
  let user = props.user !== null? 1:0;

  return(
    <div className={cls}>
      <ul>
        {user ? left.map((opt) => map_item(opt, props, "nav-left-item")) :
          <li>
            <i>Inicio de sesión</i>
            <LoginForm setUser={props.setUser} li_item={"nav-left-item"}/>
          </li>
        }
      </ul>
      <div className="spacer"/>
      <ul>
        {props.mobile ? top[user].map((opt) => map_item(opt, props, "nav-left-item")) : null}
        <li className="nav-left-item">
          <a href="https://www.google.com/">
            <span className="fas fa-book"/>
            <i>Documentación</i>
          </a>
        </li>
        <li className="nav-left-item">
          <a href="https://www.google.com/">
            <span className="fas fa-info-circle"/>
            <i>About</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export {OptionsTop, OptionsLeft} ;
