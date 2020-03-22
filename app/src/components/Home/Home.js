import React from 'react';
import Registro from './Registro.js';
import Contacta from './Contacta.js';
import './Home.css';

import logo_p from '../cte/pandora-logo.png';
import logo from '../cte/pandora-texto.png';

class Home extends React.Component {
  render() {
    return (
      <div className="app-container">
        <div className="row">
          <div className="column col-port">
            <img src={logo_p} className="logo-p" alt="Logo sombra"/>
            <img src={logo} alt="Pandora"/>
            <div className="row">
              <div className="col-100">
                <h2>Protege, guarda, recuerda ... </h2>
                <h1>tus contraseñas.</h1>
              </div>
            </div>
          </div>
          <div className="column col-rest">
           <Registro/>
          </div>
        </div>
        <div className="row wireframe">
          <div className="column col-100"
            style={{height: '200px'}}> SIN ADJUDICAR </div>
        </div>
        <div className="row">
          <Contacta/>
        </div>
      </div>
    );
  }
}

export default (Home);
