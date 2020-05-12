import React from 'react';
import { history, mailValidation, passwValidation, twoFAValidation } from '../../utils';
import { Usuario, setToken } from '../../agent';
import './LoginForm.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.setUser = props.setUser;
    this.li = props.li_item;
    this.state = {
      user: '',
      password: '',
      twofa: false,
      fa_code: ''
    };

    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleChange2FA = this.handleChange2FA.bind(this);
    this.handleSubmitMail = this.handleSubmitMail.bind(this);
    this.handleSubmit2FA = this.handleSubmit2FA.bind(this);
  }

  handleChangeUser(event) {
    this.setState({ user: event.target.value });
  }
  handleChangePass(event) {
    this.setState({ password: event.target.value });
  }
  handleChange2FA(event) {
    this.setState({ fa_code: event.target.value });
  }

  async handleSubmitMail(event) {
    event.preventDefault();
    var e = null;

    if (mailValidation(this.state.user)){
      if (passwValidation(this.state.password)) {
        this.setState({twofa :true});
      } else {
        e = new CustomEvent('PandoraAlert', { 'detail': {code:4, text:'Contraseña no válida'} });
        window.dispatchEvent(e);
      }
    } else {
      e = new CustomEvent('PandoraAlert', { 'detail': {code:4, text:'Email no válido'} });
      window.dispatchEvent(e);
    }
  }
  async handleSubmit2FA(event) {
    event.preventDefault();
    var e = null;
    if (twoFAValidation(this.state.fa_code)){
      let x = await Usuario.login2fa(this.state.user, this.state.password, this.state.fa_code);
      if (x.status === 200){
        setToken(x.token);
        this.setUser({ user: {
          mail: this.state.user,
          password: this.state.password,
          token: x.token
        }});
        e = new CustomEvent('PandoraAlert', { 'detail': {
          code: 1,
          text:'Sesión iniciada (' + this.state.user + ')'
        }});
        history.push('/home');
      } else {
        e = new CustomEvent('PandoraAlert', { 'detail': {
          code: 4,
          text: 'Error ' + x.status + ': ' + x.statusText
        }});
        this.setState({twofa: false});
      }
    } else {
      e = new CustomEvent('PandoraAlert', { 'detail': { code: 4, text: 'Error: Código 2FA no válido.'}});
    }
    if (e !== null) window.dispatchEvent(e);
  }


  render() {
    if (!this.state.twofa) {
      return (
        <form onSubmit={this.handleSubmitMail}>
          <li className="input-label">
            <div className={this.li + " input-group"}>
              <label className={this.state.user!=="" ? "label-active":null}>
                Usuario
              </label>
              <input type="text" maxLength="100" value={this.state.user} onChange={this.handleChangeUser}/>
            </div>
          </li>
          <li className="input-label">
            <div className={this.li + " input-group"}>
              <label className={this.state.password!=="" ? "label-active":null}>
                Contraseña
              </label>
              <input type="password" maxLength="40" value={this.state.password} onChange={this.handleChangePass}/>
            </div>
          </li>
          <li className={this.li}>
            <button type="submit" >
              <span className="fas fa-sign-in-alt"/>
              <i>Iniciar Sesión</i>
            </button>
          </li>
        </form>
      );
    } else {
      return(
        <form onSubmit={this.handleSubmit2FA}>
          <li className="input-label">
            <div className={this.li + " input-group"}>
              <label className={this.state.fa_code!=="" ? "label-active":null}>
                Código 2FA
              </label>
              <input type="text" value={this.state.fa_code} onChange={this.handleChange2FA}/>
            </div>
          </li>
          <li className={this.li}>
            <button type="submit" >
              <span className="fas fa-sign-in-alt"/>
              <i>Verificar código 2FA</i>
            </button>
          </li>
        </form>
      );
    }
  }
}


export default LoginForm;
