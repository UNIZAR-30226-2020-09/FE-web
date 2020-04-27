import React from 'react';
import PassModal from './PassModal';
import NewPass from './NewPass';
import './Passwords.css';
import {Contrasenas} from '../../agent';

const del = "fas fa-trash-alt";
const edit = "fas fa-pen";

class ContraObj extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.data;
    this.delPass = props.delPass;
    this.editPass = props.editPass;
  }

  faux(ev){
    let ch = ev.currentTarget.parentElement.parentElement;
    if (ch.style.maxHeight) {
      ch.style.maxHeight = null;
    } else {
      ch.style.maxHeight = 310 + "px";
      //panel.scrollHeight + 20 + "px"; // TODO:
    }
  }

  render() {
    let twoR = {'margin-right': '5px'};
    let twoL = {'margin-left': '5px'};
    return (
      <li>
        <div className="ctr-title">
          <button onClick={this.faux}>
            <i>{this.data.passwordName}</i>
          </button>
          <span className={edit} onClick={() => this.editPass(this.data)}/>
          <span className={del} onClick={() => this.delPass(this.data)}/>
        </div>
        <div className="ctr-body">
          <div className="box break">
            <h1>Usuario</h1>
            <h2>{this.data.userName}</h2>
          </div>
          <div className="box break">
            <h1>Contraseña</h1>
            <h2>{this.data.password}</h2>
          </div>
          <div className="box" style={twoR}>
            <h1>Expira en</h1>
            <h2>{this.data.noDaysBeforeExpiration} dias</h2>
          </div>
          <div className="box" style={twoL}>
            <h1>Categoría</h1>
            <h2>{this.data.categoryName}</h2>
          </div>
          <div className="box break">
            <h1>Texto Opcional</h1>
            <h2>{this.data.userName}</h2>
          </div>
        </div>
      </li>
    );
  }
}


class Passwords extends React.Component {
  constructor(props){
    super(props);
    this.mp = props.getUser(); // SI NULL, REDIRECCION DESDE PADRE
    if (this.mp !== null) this.mp = this.mp.password;
    this.state = {
      addModal: false,
      busq: '',
      contras: [],
      grupales: []
    };
    this.listar_contras();

    this.delPass = this.delPass.bind(this);
    this.edit = null;
    this.getEdit = this.getEdit.bind(this);
    this.editPass = this.editPass.bind(this);
    this.newPass = this.newPass.bind(this);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleBusqEdit = this.handleBusqEdit.bind(this);

    this.componentAux = function() {
      this.classList.toggle("active-arc");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.childElementCount*310 + "px";
        //panel.scrollHeight + 20 + "px"; // TODO:
      }
    }
  }

  async listar_contras(acordeon=true){
    let x = await Contrasenas.listar(this.mp);
    console.log(x);
    if (x.status === 200) {
      this.setState({ contras: x.passwords });
    } else {
      var e = new CustomEvent('PandoraAlert', { 'detail': {code:5, text:'No se han podido recuperar las contraseñas.'} });
      window.dispatchEvent(e);
    }
    if(acordeon){
      var acc = document.getElementsByClassName("accordion");
      var i, ev = new Event("click");
      for (i = 0; i < acc.length; i++) {
        acc[i].dispatchEvent(ev);
      }
    }
  }

  async delPass(pass){
    let x = await Contrasenas.del(pass.passId);
    var e = null;
    if(x.status === 200) e = new CustomEvent('PandoraAlert', { 'detail': {code:2, text:'Contraseña borrada.'} });
    else e = new CustomEvent('PandoraAlert', { 'detail': {code:5, text:'No se han podido borrar la contraseña.'} });
    if (e !== null) window.dispatchEvent(e);
    this.listar_contras(false);
  }

  editPass(x){
    this.edit = x;
    this.refs.newpass.setEdit();
    this.toggleModal();
  }
  newPass(){
    this.edit = null;
    this.refs.newpass.setNew();
    this.toggleModal();
  }
  getEdit(){
    return this.edit;
  }

  toggleModal(){
    this.setState({ addModal: !this.state.addModal });
  }
  handleBusqEdit(event){
    this.setState({ busq: event.target.value });
  }

  componentDidMount(){
    var acc = document.getElementsByClassName("accordion"), i;
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", this.componentAux);
    }
  }
  componentWillUnmount(){
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
      acc[i].removeEventListener("click", this.componentAux);
    }
  }

  render() {
    if (this.mp === null) return null;
    return (
      <div className="app-container">
        <PassModal show={this.state.addModal} handleClose={this.toggleModal}>
          <NewPass handleClose={this.toggleModal} mp={this.mp}
                    ref="newpass" edit={this.getEdit} listar={this.listar_contras.bind(this)}/>
        </PassModal>
        <div className="passwords">
          <div className="row">
            <div className="column title">
              <h1>Mis Contraseñas</h1>
              <hr/>
            </div>
          </div>
          <div className="row busq">
            <div className="column col-30">
              <button type="button" className="btn" onClick={this.newPass}>
                <span className="fas fa-plus"/>
                <i>Nueva contraseña</i>
              </button>
            </div>
            <div className="column col-sep"/>
            <div className="column col-rest">
              <div className="busq-bar">
                <span className="fas fa-search"/>
                <input type="text" placeholder="Buscar . . ."
                  value={this.state.busq} onChange={this.handleBusqEdit}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="column col-100">
              <button className="accordion">Mis Contraseñas</button>
              <ul className="panel">
                {this.state.contras.map((c,i) =>
                  <ContraObj key={i} data={c} delPass={this.delPass} editPass={this.editPass}/>)}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="column col-100">
              <button className="accordion">Contraseñas Grupales</button>
              <ul className="panel">
                {this.state.grupales.map((c,i) =>
                  <ContraObj key={i} data={c} delPass={this.delPass} editPass={this.editPass}/>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Passwords;
