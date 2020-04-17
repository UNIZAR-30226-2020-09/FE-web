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
  }

  faux(ev){
    let ch = ev.currentTarget.parentElement.parentElement;
    if (ch.style.maxHeight) {
      ch.style.maxHeight = null;
    } else {
      ch.style.maxHeight = 100 + "px";
      //panel.scrollHeight + 20 + "px"; // TODO:
    }
  }

  render() {
    return (
      <li>
        <div className="ctr-title">
          <button onClick={this.faux}>
            <i>{this.data.passwordName}</i>
          </button>
          <span className={edit} onClick={() => console.log("edit")}/>
          <span className={del} onClick={() => this.delPass(this.data)}/>
        </div>
        <div className="ctr-body">
          Usuario: {this.data.userName}
          <br/>
          Contraseña: {this.data.password}
          <br/>
          TextoOpcional: {this.data.optionalText}
        </div>
      </li>
    );
  }
}


class Passwords extends React.Component {
  constructor(props){
    super(props);
    this.mp = props.user.password;
    this.state = {
      addModal: false,
      busq: '',
      contras: [],
      grupales: []
    };
    this.listar_contras();

    this.delPass = this.delPass.bind(this);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleBusqEdit = this.handleBusqEdit.bind(this); 

    this.componentAux = function() {
      this.classList.toggle("active-arc");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.childElementCount*100 + "px";
        //panel.scrollHeight + 20 + "px"; // TODO:
      }
    }
  }

  async listar_contras(){
    let x = await Contrasenas.listar(this.mp);
    console.log(x);
    if (x.status === 200) {
      this.setState({ contras: x.passwords });
    } else {
      var e = new CustomEvent('PandoraAlert', { 'detail': {code:5, text:'No se han podido recuperar las contraseñas.'} });
      window.dispatchEvent(e);
    }
    var acc = document.getElementsByClassName("accordion");
    var i, ev = new Event("click");
    for (i = 0; i < acc.length; i++) {
      acc[i].dispatchEvent(ev);
    }
  }

  async delPass(e){
    let x = await Contrasenas.del(e.passId);
    if(x.status === 200) {
      var e = new CustomEvent('PandoraAlert', { 'detail': {code:2, text:'Contraseña borrada.'} });
      window.dispatchEvent(e); 
    }
    else {
      var e = new CustomEvent('PandoraAlert', { 'detail': {code:5, text:'No se han podido borrar la contraseña.'} });
      window.dispatchEvent(e);
    }

    window.location.reload();

  }

  toggleModal(){
    this.setState({ addModal: !this.state.addModal });
  }
  handleBusqEdit(event){
    this.setState({ busq: event.target.value });
  }

  componentDidMount(){
    var acc = document.getElementsByClassName("accordion");
    var i, ev = new Event("click");
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
    return (
      <div className="app-container">
        <PassModal show={this.state.addModal} handleClose={this.toggleModal}>
          <NewPass handleClose={this.toggleModal} mp={this.mp}/>
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
              <button type="button" className="btn" onClick={this.toggleModal}>
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
                {this.state.contras.map((c,i) => <ContraObj key={i} data={c}
                delPass={this.delPass}/>)}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="column col-100">
              <button className="accordion">Contraseñas Grupales</button>
              <ul className="panel">
                {this.state.grupales.map((c,i) => <ContraObj key={i} data={c}
                delPass={this.delPass}/>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Passwords;
