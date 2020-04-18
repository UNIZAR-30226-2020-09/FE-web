import React from 'react';
import Registro from './Registro.js';
import Contacta from './Contacta.js';
import Stats from './Stats.js';
import Bienvenido from './Bienvenido.js';
import './Home.css';

import logo_p from '../cte/pandora-logo.png';
import logo from '../cte/pandora-texto.png';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.getUser = props.user;
  }

  render() {
    let box;
    let user = this.getUser();
    if (user === null){
      box = <Registro/>
    }else{
      box = <Bienvenido user={user}/>
    }
    return (
      <div className="app-container">
        <div className="row">
          <div className="column col-port">
            <img src={logo_p} className="logo-p" alt="Logo sombra"/>
            <img src={logo} alt="Pandora"/>
            <div className="row">
              <div className="col-100">
                <h2>Protege, guarda, recuerda...</h2>
                <h1>Sus contraseñas</h1>
              </div>
            </div>
          </div>
          <div className="column col-rest">
           {box}
          </div>
        </div>
        <div className="row">
          <Stats/>
        </div>
        <div className="row">
          <Contacta/>
        </div>
      </div>
    );
  }
}

export default (Home);
