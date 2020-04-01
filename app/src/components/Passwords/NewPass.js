import React from 'react';
//import Passwords from './Passwords';
//import { ContactaAgent } from '../../agent';
import './NewPass.css';


class NewPass extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          passwordName: '',
          password: '',
          expirationTime: "120",
          passwordCategoryId: "0",
          optionalText: '',
          userName: ''
      };
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangePass = this.handleChangePass.bind(this);
      this.handleChangeTime = this.handleChangeTime.bind(this);
      this.handleChangeCat = this.handleChangeCat.bind(this);
      this.handleChangeText = this.handleChangeText.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
      this.setState({ passwordName: event.target.value });
    }
    handleChangePass(event) {
      this.setState({ password: event.target.value });
    }
    handleChangeTime(event) {
      this.setState({ expirationTime: event.target.value });
    }
    handleChangeCat(event) {
      this.setState({ passwordCategoryId: event.target.value });
    }
    handleChangeText(event) {
      this.setState({ optionalText: event.target.value });
    }

    async handleSubmit(event) {
      event.preventDefault();
      console.log(this.state);
      this.setState({
        passwordName: '',
        password: '',
        expirationTime: "120",
        passwordCategoryId: "0",
        optionalText: '',
        userName: ''
      });
    }

    render(){
      return(
        <div className="newpass">
            <h1>Crea una nueva contraseña</h1>
            <form id="newpassform" onSubmit={this.handleSubmit} >
              <div className="input-group">
                <label className={this.state.passwordName!=="" ? "label-active":null}>
                  Nombre:
                </label>
                <input
                  type="text" name="mail"
                  value={this.state.passwordName}
                  onChange={this.handleChangeName}
                  required
                />
              </div>
              <div className="input-group">
                <label className={this.state.password!=="" ? "label-active":null}>
                  Contraseña:
                </label>
                <input
                  type="text" name="mail"
                  value={this.state.password}
                  onChange={this.handleChangePass}
                  required
                />
              </div>
              <div className="input-group">
                <label className={this.state.expirationTime!=="" ? "label-active":null}>
                  Tiempo de expiración:
                </label>
                <input
                  type="number" name="mail"
                  min="1" max="600"
                  value={this.state.expirationTime}
                  onChange={this.handleChangeTime}
                />
              </div>
              <div className="input-group">
                <select name="cat"
                value={this.state.passwordCategoryId}
                onChange={this.handleChangeCat}>
                  <option value="0">Sin categoría</option>
                  <option value="1">Audi</option>
                  <option value="2">BMW</option>
                  <option value="3">Citroen</option>
                  <option value="4">Ford</option>
                  <option value="5">Honda</option>
                </select>
              </div>
              <div className="input-group">
                <label className={this.state.optionalText!=="" ? "label-active": "textarea-correction"}>
                  Texto opcional:
                </label>
                <textarea
                type="text"
                name="body"
                value={this.state.optionalText}
                onChange={this.handleChangeText}
                />
              </div>
              <div className="input-group">
                <button type="submit" className="btn">
                  Enviar
                </button>
              </div>
            </form>
        </div>
      )
    }

}

export default NewPass;
