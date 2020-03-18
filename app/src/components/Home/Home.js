import React from 'react';
import './TEMP.css';

class Home extends React.Component {
  render() {
    return (
      <div className="app-container">
          <div className="master-row">
            <div className="column-r60 wireframe"> PORTADA </div>
            <div className="column-rest wireframe"> REGISTRO </div>
          </div>
          <div className="master-row">
            <div className="all-row wireframe"> SIN ADJUDICAR </div>
          </div>
          <div className="master-row">
            <div className="all-row wireframe"> CONTACTO </div>
          </div>
      </div>
    );
  }
}

export default (Home);
