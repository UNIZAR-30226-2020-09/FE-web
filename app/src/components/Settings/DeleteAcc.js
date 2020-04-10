import React from 'react';
import './AdminCat.css';
import { requests } from '../../agent';

const del = "fas fa-trash-alt";

class DeleteAcc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     new: false,
     onedit: []
    };
  }

  async handdleClick(e) {
    //e.preventDefault();
    if(window.confirm("¿Estas seguro?")){
      let x = await requests.del('/usuario/eliminar');
       console.log(x);
       if(x.status === 0){
         window.alert('Usuario Eliminado');
       }
       else{
         window.alert('Error: ' + x.text + ' ' + x.status);
       }
  
    }
  }

  render(){
    return (
      <div className="categorias">
        <div className="slot title">
          Administrar cuenta
        </div>
        <ul>
            <li className="slot inner">
              <i>Eliminar Cuenta </i>                                  
              <span className={del} onClick={this.handdleClick}/>
            </li>
        </ul>
      </div>
    );
  }
}

export default (DeleteAcc);
