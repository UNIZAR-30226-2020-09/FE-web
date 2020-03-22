import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm.js';

const top = [[
  /*{id:1, name: 'Iniciar Sesión', link: '/login', icon: 'fas fa-sign-in-alt'},*/
  {id:2, name: 'Ayuda', link: '/about', icon: 'far fa-question-circle'}
], [
  {id:3, name: 'Cerrar Sesión', link: {pathname: '/', state: {logout: true}}, icon: 'fas fa-sign-out-alt'},
  {id:4, name: 'Ayuda', link: '/about', icon: 'far fa-question-circle'},
]];

const left = [
  {id:7, name: 'Inicio', link: '/welcome', icon: 'fas fa-home'},
  {id:8, name: 'Mis Contraseñas', link: '/passwords', icon: 'fas fa-key'},
  {id:9, name: 'Ajustes', link: '/settings', icon: 'fas fa-cog'}
];


const OptionsTop = props => {
  if (props.mobile) return null;
  let user = props.user !== null? 1:0;

  return (
    <div className="collapse">
      <ul>
        { props.user === null?
          <li>
            <LoginForm setUser={props.setUser} li_item={"nav-top-item"}/>
          </li>
          : null
        }
      {top[user].map((opt) =>
        <li key={opt.id}>
          <Link to={opt.link} className="nav-top-item">
            <span className={opt.icon}/> {opt.name}
          </Link>
        </li>
      )}
      </ul>
    </div>
  );
};

// Map function in OptionsLeft
function auxOptionsLeftmap(opt, props) {
  return (
    <li key={opt.id} className={opt.link !== props.currentlocation ?
                                "nav-left-item" : "nav-left-item active"}>
      <Link to={opt.link}>
        <span className={opt.icon}/>
        <i>{opt.name}</i>
      </Link>
    </li>
  );
}

const OptionsLeft = props => {
  if (props.user === null && !props.mobile) return null;
  let cls = "nav-vertical"
  if (props.mobile) {
    cls += " responsive";
  }
  let user = props.user !== null? 1:0;//, log = null;

  return(
    <div className={cls}>
      <ul>
        {props.user ?
          left.map((opt) => auxOptionsLeftmap(opt, props))
          :
          <li>
            <LoginForm setUser={props.setUser} li_item={"nav-left-item"}/>
          </li>
        }
      </ul>
      <div className="spacer"/>
      <ul>
        {props.mobile ? top[user].map((opt) => auxOptionsLeftmap(opt, props)) : null}
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
