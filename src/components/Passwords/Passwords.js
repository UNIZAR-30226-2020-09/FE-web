import React from 'react';
import PassModal from './PassModal';
import NewPass from './NewPass';
import './Passwords.css';
import {Contrasenas, Categorias} from '../../agent';

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
    document.body.style.backgroundColor = "#ebe4f4";
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
          <div className="box twoR">
            <h1>Expira en</h1>
            <h2>{this.data.noDaysBeforeExpiration} dias</h2>
          </div>
          <div className="box twoL">
            <h1>Categoría</h1>
            <h2>{this.data.categoryName}</h2>
          </div>
          <div className="box break">
            <h1>Texto Opcional</h1>
            <h2>{this.data.optionalText}</h2>
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
      filtrarCat: false,
      filtrarCatId: 0,
      filtrarBusq: false,
      filtrarBusqText: '',
      objKey: 0,
      cats: [],
      contras: [],
      grupales: []
    };
    this.listar_cat();
    this.listar_contras();

    this.delPass = this.delPass.bind(this);
    this.edit = null;
    this.getEdit = this.getEdit.bind(this);
    this.editPass = this.editPass.bind(this);
    this.newPass = this.newPass.bind(this);

    this.toggleModal = this.toggleModal.bind(this);

    this.handleFiltrarBusq = this.handleFiltrarBusq.bind(this);
    this.handleFiltrarCat = this.handleFiltrarCat.bind(this);

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

  async listar_cat(){
    let x = await Categorias.list();
    if (x.status === 200){
      this.setState({ cats: x.categories });
    }else{
      this.setState({ cats: [{catId: -1,categoryName: "ERROR"}] });
    }
  }

  async listar_contras(acordeon=true){
    let x;
    if(this.state.filtrarCat){
      x = await Contrasenas.filtrar(this.mp, this.state.filtrarCatId);
    }else{
      x = await Contrasenas.listar(this.mp);
    }
    if (x.status === 200) {
      if(this.state.filtrarBusq){
        let x1 = x.passwords;
        let x2 = [];
        let j = 0;
        for (let i = 0; i < x1.length; i++) {
          if(x1[i].passwordName.includes(this.state.filtrarBusqText)){
            x2[j] = x1[i];
            j++;
          }
        }
        this.setState({ contras: x2 });
      }else{
        this.setState({ contras: x.passwords });
      }
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
    let g1 = this.state.objKey;
    let g2 = this.state.contras.length;
    this.setState({ objKey: g1+g2 });
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

  async handleFiltrarBusq(event){
    event.preventDefault();
    let x = event.target.value;
    await this.setState({ filtrarBusqText: x });
    if(x === ''){
      await this.setState({ filtrarBusq: false });
    }else{
      await this.setState({ filtrarBusq: true });
    }
    this.listar_contras(false);
  }
  async handleFiltrarCat(event){
    event.preventDefault();
    let x = event.target.value;
    await this.setState({ filtrarCatId: x });
    if(x === 'todas'){
      await this.setState({ filtrarCat: false });
    }else{
      await this.setState({ filtrarCat: true });
    }
    this.listar_contras(false);
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
    document.body.style.backgroundColor = "#ebe4f4";
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
                <select name="catt" onChange={this.handleFiltrarCat}>
                    <option key='0' value='todas'>Todas</option>
                  {this.state.cats.map( (cat, i) =>
                    <option key={i} value={cat.catId}>{cat.categoryName}</option>
                  )}
                  </select>
                <input type="text" placeholder="Inserta palabras clave"
                  value={this.state.filtrarBusqText} onChange={this.handleFiltrarBusq}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="column col-100">
              <button className="accordion">Mis Contraseñas</button>
              <ul className="panel">
                {this.state.contras.map((c,i) =>
                  <ContraObj key={i+this.state.objKey} data={c} delPass={this.delPass} editPass={this.editPass}/>)}
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
