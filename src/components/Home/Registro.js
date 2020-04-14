import React,{Component} from 'react';
import './Registro.css';
import { mailValidation, passwValidation } from '../../utils';
import { Usuario } from '../../agent';

class Registro extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm: ''
    };
    this.InputChange = this.InputChange.bind(this);
    this.Register = this.Register.bind(this);
  }

  InputChange(event){
    const {value,name} = event.target;
    this.setState({
      [name]: value
    });
  }

  async Register(event){
    event.preventDefault();
    var e = null;
    if (mailValidation(this.state.email)){
      if (passwValidation(this.state.password)){
        if(this.state.password === this.state.confirm){
          let x = await Usuario.registro(this.state.email, this.state.password);
          //console.log(this.state);
          //console.log(this.state.email, this.state.password);
          //console.log(x);
          if (x.status === 200) {
            e = new CustomEvent('PandoraAlert', { 'detail': {code:2, text: x.statusText}});
            this.setState({email: '', password: '', confirm: ''});
          }
          else e = new CustomEvent('PandoraAlert', { 'detail': {code:5, text:'Error: ' + x.statusText}});
        } else {
          window.alert();
          e = new CustomEvent('PandoraAlert', { 'detail': {code:4, text:'Las contraseñas no coinciden.'}});
        }
      } else {
        e = new CustomEvent('PandoraAlert', { 'detail': {code:4, text:'Contraseña no válida.'}});
      }
    } else e = new CustomEvent('PandoraAlert', { 'detail': {code:4, text:'Email no válido.'}});
    if (e !== null) window.dispatchEvent(e);
  }

    render(){
      return(
        <div className="registro">
          <div className="box">
            <h1>Regístrate</h1>
            <form onSubmit={this.Register}>
              <div className="input-group">
                <label className={this.state.email!=="" ? "label-active":null}>
                  Correo
                </label>
                <input type="text" name="email"
                  value={this.state.email} onChange={this.InputChange}/>
              </div>
              <div className="input-group">
                <label className={this.state.password!=="" ? "label-active":null}>
                  Contraseña
                </label>
                <input type="text" name="password"
                  value={this.state.password} onChange={this.InputChange}/>
              </div>
              <div className="input-group">
                <label className={this.state.confirm!=="" ? "label-active":null}>
                  Repetir contraseña
                </label>
                <input type="text" name="confirm"
                  value={this.state.confirm} onChange={this.InputChange}/>
              </div>
              <div className="input-group">
                <button type="submit" className="btn">
                  <span className="fas fa-sign-in-alt"/> Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
}

export default Registro;
