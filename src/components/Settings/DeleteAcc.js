import React from 'react';
import './AdminCat.css';
import { Usuario } from '../../agent';
import { history } from '../../utils';

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
    if(window.confirm("¿Estas seguro?")){
      let x = await Usuario.del();
       console.log(x);
       if(x.status === 200){
         var ev = new CustomEvent('PandoraAlert', { 'detail': {
           code: 2,
           text:'Se ha borrado su cuenta.'
         }});
         window.dispatchEvent(e);
         history.push('/', {logout: true});
       } else {
         window.alert('Error: ' + x.text + ' ' + x.status);
         var ev = new CustomEvent('PandoraAlert', { 'detail': {
           code: 5,
           text: 'Error ' + x.status + ': ' + x.statusText
         }});
         window.dispatchEvent(e);
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
