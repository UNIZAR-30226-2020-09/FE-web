import React from 'react';
import PassModal from './PassModal';
import NewPass from './NewPass';
import './Passwords.css';


class ContraObj extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.data;
  }
  render() {
    return (
      <li>
        <div style={{height: "10px"}}>
          dsaassda {this.data}
        </div>
      </li>
    );
  }
}


class Passwords extends React.Component {
  constructor(props){
    super(props);
    this.state = Object.assign({},{ addModal: false, busq: ''},this.recoverC());

    this.toggleModal = this.toggleModal.bind(this);
    this.handleBusqEdit = this.handleBusqEdit.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);

    this.componentAux = function() {
      this.classList.toggle("active-arc");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 20 + "px";
      }
    }
  }

  recoverC(){
    return { contras: [1,2,3,4], grupales: [5,6,7] };
  }
  forceUpdate(){
    /* RECUPERAR DE NUEVO LAS CONTRASEÑAS */
    this.setState(this.recoverC());
  }
  toggleModal(){
    this.setState({ addModal: !this.state.addModal });
  }
  handleBusqEdit(event){
    this.setState({ busq: event.target.value });
  }

  componentDidMount(){
    this.forceUpdate();
    var acc = document.getElementsByClassName("accordion");
    var i, ev = new Event("click");
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", this.componentAux);
      acc[i].dispatchEvent(ev);
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
          <NewPass handleClose={this.toggleModal}/>
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
                {this.state.contras.map((c,i) => <ContraObj key={i} data={c}/>)}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="column col-100" style={{height: "200px"}}>
              <button className="accordion">Contraseñas Grupales</button>
              <ul className="panel">
                <div style={{height: "200px"}}>
                  {this.state.grupales.map((c,i) => <ContraObj key={i} data={c}/>)}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Passwords;
