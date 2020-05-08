import React from 'react';
import Contacta from '../Home/Contacta.js';
import './About.css';

import logo from '../cte/pandora-texto.png';

class About extends React.Component {

  render() {
    document.body.style.backgroundColor = "#a997df";
    return (
      <div className="app-container">
        <div className="about">
          <div className="row">
            <div className="column col-1">
              <img src={logo} alt="Pandora"/>
            </div>
            <div className="column col-2">
              <h1>Pandora es una plataforma sin ánimo de lucro<br/>que vela por la seguridad de tus contraseñas,<br/>
              mateniéndolas en secreto gracias a:<br/> AES-256, criptografía de clave pública, sal...<br/>
              Entre muchas otras características<br/><br/>El equipo que está detrás de Pandora está<br/>
              formado por ocho estudiantes del grado en<br/>Ingeniería Informática de la Universidad de Zaragoza</h1>
              </div>
          </div>
          <div className="row">
            <Contacta/>
          </div>
        </div>
      </div>
    );
  }
}

export default (About);
