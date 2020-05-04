import React from 'react';
import AdminCat from './AdminCat';
import { truncateText } from '../../utils';
import './Settings.css';

import logo from '../cte/pandora-texto.png';
import DeleteAcc from './DeleteAcc';

class Settings extends React.Component {
  constructor(props){
    super(props);
    this.updateParent = props.updateParent;
    this.getUser = props.getUser;
  }
  render() {
    let user = this.getUser();
    if (user === null) return null;
    return (
      <div className="app-container">
        <div className="settings">
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
                <h1>{truncateText(user.mail,30)}</h1>
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
        </div>
      </div>
    );
  }
}

export default (Settings);
