import React from 'react';
import { truncateText } from '../../utils';
import './Bienvenido.css';

class Bienvenido extends React.Component{
  constructor(props){
    super(props);
    this.getUser = props.user;
  }

  render(){
    return(
      <div className="bienvenido">
        <div className="box">
          <div className="row">
            <h1>Bienvenido a Pandora {truncateText(this.getUser.mail,23)}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Bienvenido;
