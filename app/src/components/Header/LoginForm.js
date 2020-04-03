import React from 'react';
import { history, mailValidation, passwValidation } from '../../utils';
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
    /////// DEBUG NO 2FA
    if (!this.state.twofa){
      this.setState({ twofa: true });
      return;
    }

    if (mailValidation(this.state.user)){
      if (passwValidation(this.state.password)) {
        let x = await Usuario.login(this.state.user, this.state.password);
        //console.log(x);
        if (x.status === 200){
          //console.log('Login:{user:', this.state.user, ";password:", this.state.password, "}");
          setToken(x.token);
          this.setUser({ user: {
            mail: this.state.user,
            password: this.state.password,
            token: x.token
          }});
          history.push('/welcome');
        } else {
          window.alert('Error ' + x.status + '\n' + x.statusText);
        }
      } else {
        window.alert('Contraseña no válida');
      }
    } else {
      window.alert('Email no válido');
    }
  }
  async handleSubmit2FA(event) {
    event.preventDefault();
    this.handleSubmitMail(event);
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
              <input type="text" value={this.state.user} onChange={this.handleChangeUser}/>
            </div>
          </li>
          <li className="input-label">
            <div className={this.li + " input-group"}>
              <label className={this.state.password!=="" ? "label-active":null}>
                Contraseña
              </label>
              <input type="password" value={this.state.password} onChange={this.handleChangePass}/>
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
