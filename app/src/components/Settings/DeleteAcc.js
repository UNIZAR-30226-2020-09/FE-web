import React from 'react';
import './AdminCat.css';
import { Categorias } from '../../agent';
import { requests } from '../../agent';

const edit = "fas fa-pen";
const del = "fas fa-trash-alt";
const ok = "fas fa-check";
const quit = "fas fa-times";
const add = "fas fa-plus";

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
