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
            <div className="column col-100">
              <img src={logo} className="logo" alt="Pandora"/>
            </div>
          </div>
          <div className="row">
            <div className="column col-100">
              <p>Pandora es una plataforma sin ánimo de lucro que vela por la
              seguridad de tus contraseñas, mateniéndolas en secreto gracias a
              encriptaciones como AES-256 o criptografía de clave pública entre
              muchas otras características.</p>
            </div>
          </div>
          <div className="row">
            <div className="column col-100">
              <p>Este proyecto fue desarrollado por 8 estudiantes del grado en
              Ingeniería Informática la <a href="https://www.unizar.es/">Universidad de Zaragoza.</a>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="column col-100">
              <div className="links">
                <h1> - - Enlaces de interés - - </h1>
                <p>
                  Equipo: <br/>
                  <span className="fab fa-github"/>
                  <a href="https://github.com/UNIZAR-30226-2020-09">UNIZAR-30226-2020-09</a>
                  <br/><br/>
                  Integrantes del equipo: <br/>
                  <span className="fab fa-github"/>
                  <a href="https://github.com/javierreraul">Raúl Javierre</a><br/>
                  <span className="fab fa-github"/>
                  <a href="https://github.com/alexx99gg">Alejandro Gómez</a><br/>
                  <span className="fab fa-github"/>
                  <a href="https://github.com/Uncastellum">Daniel González</a><br/>
                  <span className="fab fa-github"/>
                  <a href="https://github.com/Aleparicio">Alejandro Paricio</a><br/>
                  <span className="fab fa-github"/>
                  <a href="https://github.com/irefu">Irene Fumanal</a><br/>
                  <span className="fab fa-github"/>
                  <a href="https://github.com/sergioge99">Sergio García</a><br/>
                  <span className="fab fa-github"/>
                  <a href="https://github.com/raulrhs">Raúl Herguido</a><br/>
                  <span className="fab fa-github"/>
                  <a href="https://github.com/JesusAngelGonzalez">Jesús González</a><br/>
                </p>
                <h1> - - - </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default (About);
