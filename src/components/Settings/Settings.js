import React from 'react';
import AdminCat from './AdminCat';
import './Settings.css';

import logo from '../cte/pandora-texto.png';
import DeleteAcc from './DeleteAcc';

class Settings extends React.Component {
  constructor(props){
    super(props);
    this.updateParent = props.updateParent;
    this.getUser = props.user;
  }
  render() {
    return (
      <div className="app-container">
        <div className="sett">
          <div className="row">
            <div className="column title">
              <h1>Ajustes</h1>
              <hr/>
            </div>
          </div>
          <div className="row user">
            <div className="column col-50">
              <span>
                <h2>Usuario actual:</h2>
                <h1>{this.getUser().mail}</h1>
              </span>
            </div>
            <div className="column col-50 hide-on-mobile">
              <img src={logo} alt="Pandora"/>
            </div>
          </div>
          <div className="row">
            <AdminCat/>
          </div>
          <div className="row">
            <DeleteAcc/>
          </div>
          <div className="row">
            <div className="column col-100 wireframe" style={{height: "200px"}}>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default (Settings);
