import React from 'react';
import { Contraseñas } from '../../agent';
import { Categorias } from '../../agent';
import './NewPass.css';

class NewPass extends React.Component {
    constructor(props){
      super(props);
      this.handleClose = props.handleClose;//para cerrar modal

      this.state = {
          passwordName: '',
          password: '',
          expirationTime: 120,
          passwordCategoryId: 0,
          optionalText: '',
          userName: ''
      };

      this.cats = [];//para listar categorías en desplegable
      this.listar_cat();

      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangePass = this.handleChangePass.bind(this);
      this.handleChangeUser = this.handleChangeUser.bind(this);
      this.handleChangeTime = this.handleChangeTime.bind(this);
      this.handleChangeCat = this.handleChangeCat.bind(this);
      this.handleChangeText = this.handleChangeText.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
      this.setState({ passwordName: event.target.value });
    }
    handleChangeUser(event) {
      this.setState({ userName: event.target.value });
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

    async listar_cat(){
      /* Pedimos categorías a la API */
      let x = await Categorias.list();
      //console.log(x);
      if (x.status === 200){
        this.cats = x.categories;
        this.setState({ passwordCategoryId: this.cats[0].catId });
      }else{
        this.cats = [{catId: -1,categoryName: "ERROR"}]
      }
    }

    async handleSubmit(event) {
      event.preventDefault();
      /* Enviamos peticion a la API */
      let x = await Contraseñas.create(this.state.passwordName, this.state.password,
        this.state.expirationTime, this.state.passwordCategoryId,
        this.state.optionalText, this.state.userName);
      /* Comprobamos respuesta de la API */
      //console.log(this.state);
      //console.log(x);
      var e = null;
      if (x.status === 200){
        e = new CustomEvent('PandoraAlert', { 'detail': {code:2, text:'Contraseña creada con éxito :)'} });
      }else{
        e = new CustomEvent('PandoraAlert', { 'detail': {
          code:4,
          text: 'Error ' + x.status + ': ' + x.statusText
        }});
      }
      if (e !== null) window.dispatchEvent(e);

      /* Reseteamos el formulario */
      this.setState({
        passwordName: '',
        password: '',
        expirationTime: 120,
        passwordCategoryId: this.cats[0].catId,
        optionalText: '',
        userName: ''
      });
      /* Cerramos el modal */
      this.handleClose();
    }


    render(){
      return(
        <div className="newpass">
            <h1>Crea una nueva contraseña</h1>
            <form id="newpassform" onSubmit={this.handleSubmit} >

              <div className="input-group">
                <label className={this.state.passwordName!=="" ? "label-active":null}>
                  Nombre
                </label>
                <input
                  type="text" name="name"
                  value={this.state.passwordName}
                  onChange={this.handleChangeName}
                  required
                />
              </div>

              <div className="input-group">
                <label className={this.state.userName!=="" ? "label-active":null}>
                  Usuario
                </label>
                <input
                  type="text" name="user"
                  value={this.state.userName}
                  onChange={this.handleChangeUser}
                />
              </div>

              <div className="input-group">
                <label className={this.state.password!=="" ? "label-active":null}>
                  Contraseña
                </label>
                <input
                  type="text" name="pass"
                  value={this.state.password}
                  onChange={this.handleChangePass}
                  required
                />
              </div>

              <div className="input-group">
                <label className={this.state.expirationTime!=="" ? "label-active":null}>
                  Tiempo de expiración
                </label>
                <input
                  type="number" name="time"
                  min="1" max="600"
                  value={this.state.expirationTime}
                  onChange={this.handleChangeTime}
                />
              </div>

              <div className="input-group">
                <select name="catt"
                value={this.state.passwordCategoryId}
                onChange={this.handleChangeCat}>
                  {this.cats.map( (cat, i) =>
                    <option key={i} value={cat.catId}>{cat.categoryName}</option>
                  )}
                </select>
              </div>

              <div className="input-group">
                <label className={this.state.optionalText!=="" ? "label-active": "textarea-correction"}>
                  Texto opcional
                </label>
                <textarea
                type="text" name="text"
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
