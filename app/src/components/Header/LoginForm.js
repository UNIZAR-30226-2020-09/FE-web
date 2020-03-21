import React from 'react';
import { history } from '../../utils';
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

  handleSubmit(event) {
    event.preventDefault();
    //console.log('Login:{user:', this.state.user, ";password:", this.state.password, "}");
    this.setUser({ user: {
      mail: this.state.user,
      token: null
    }});
    //console.log(history);
    history.push('/welcome');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <li className="input-label">
          <div className={this.li + " input-group"}>
            <label className={this.state.user!=="" ? "label-active":null}>
              Usuario:
            </label>
            <input type="text" value={this.state.user} onChange={this.handleChangeUser}/>
          </div>
        </li>
        <li className="input-label">
          <div className={this.li + " input-group"}>
            <label className={this.state.password!=="" ? "label-active":null}>
              Contraseña:
            </label>
            <input type="text" value={this.state.password} onChange={this.handleChangePass}/>
          </div>
        </li>
        <li>
          <button type="submit" className={this.li}>
            <span className="fas fa-sign-in-alt"/> Iniciar Sesión
          </button>
        </li>
      </form>
    );
  }
}


export default LoginForm;
