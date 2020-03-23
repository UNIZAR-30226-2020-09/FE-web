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
      password: ''
    };

    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUser(event) {
    this.setState({ user: event.target.value });
  }
  handleChangePass(event) {
    this.setState({ password: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (mailValidation(this.state.user)){
      if (passwValidation(this.state.password)) {
        let x = await Usuario.login(this.state.user, this.state.password);
        //console.log(x);
        if (x.status === 200){
          //console.log('Login:{user:', this.state.user, ";password:", this.state.password, "}");
          let token = x.token.replace('Bearer ', '');
          setToken(token);
          this.setUser({ user: {
            mail: this.state.user,
            password: this.state.password,
            token: token
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
            <span className="fas fa-sign-in-alt"/> Iniciar Sesión
          </button>
        </li>
      </form>
    );
  }
}


export default LoginForm;
