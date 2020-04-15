import React from 'react';
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
              <h1>Bienvenido a Pandora</h1>
              <h1>{this.getUser.mail}</h1>
            </div>
          </div>
        </div>
      );
    }
}

export default Bienvenido;
