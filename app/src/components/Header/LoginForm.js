import React from 'react';
import './LoginForm.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
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
    console.log('Login:{user:', this.state.user, ";password:", this.state.password, "}");
    //event.preventDefault();
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
            <a>
            <span className="fas fa-sign-in-alt"/> Iniciar Sesión
            </a>
          </button>
        </li>
      </form>
    );
  }
}


export default LoginForm;
