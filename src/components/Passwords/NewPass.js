import React from 'react';
import { Contrasenas } from '../../agent';
import { Categorias } from '../../agent';
import './NewPass.css';

class NewPass extends React.Component {
    constructor(props){
      super(props);
      this.handleClose = props.handleClose;//para cerrar modal
      this.mp = props.mp;//masterPassword
      this.getEdit = props.edit;//contraseña que ha sido pulsada

      this.state = {
          passwordName: '',
          password: '',
          expirationTime: 120,
          passwordCategoryId: 0,
          optionalText: '',
          userName: ''
      };
      this.id = 0;//id contraseña
      this.edit = false;//edit o create
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

    setEdit() {
      let ed = this.getEdit();
      this.setState({
        passwordName: ed.passwordName,
        password: ed.password,
        expirationTime: ed.noDaysBeforeExpiration,
        passwordCategoryId: ed.catId,
        optionalText: ed.optionalText,
        userName: ed.userName
      });
      this.id = ed.passId;
      this.edit = true;
    }

    setNew() {
      this.setState({
        passwordName: '',
        password: '',
        expirationTime: 120,
        passwordCategoryId: this.cats[0].catId,
        optionalText: '',
        userName: ''
      });
      this.id = 0;
      this.edit = false;
    }

    async listar_cat(){
      /* Pedimos categorías a la API */
      let x = await Categorias.list();
      if (x.status === 200){
        this.cats = x.categories;
        this.setState({ passwordCategoryId: this.cats[0].catId });
      }else{
        this.cats = [{catId: -1,categoryName: "ERROR"}]
      }
    }

    async handleSubmit(event) {
      event.preventDefault();
      var e = null;
      /* Comprobamos carácteres máximos */
      let correct = false;
      if(this.state.passwordName.length > 30){
        e = new CustomEvent('PandoraAlert', { 'detail': {
          code:4,
          text:'Nombre de la contraseña demasiado largo (max 30 carácteres)'}});
      }else if(this.state.userName.length > 30){
        e = new CustomEvent('PandoraAlert', { 'detail': {
          code:4,
          text:'Nombre de usuario demasiado largo (max 30 carácteres)'}});
      }else if(this.state.optionalText.length > 100){
        e = new CustomEvent('PandoraAlert', { 'detail': {
          code:4,
          text:'Texto adicional demasiado largo (max 100 carácteres)'}});
      }else{
        correct = true;
      }
      if (e !== null) window.dispatchEvent(e);
      if(correct===true){
        if(this.edit===false){
          /* Enviamos peticion *CREAR* a la API */
          let x = await Contrasenas.create(this.mp, this.state.passwordName, this.state.password,
            this.state.expirationTime, this.state.passwordCategoryId,
            this.state.optionalText, this.state.userName);
          /* Comprobamos respuesta de la API */
          if (x.status === 200){
            e = new CustomEvent('PandoraAlert', { 'detail': {
              code:2,
              text:'Contraseña creada con éxito.'}});
          }else{
            e = new CustomEvent('PandoraAlert', { 'detail': {
              code:4,
              text: 'Error ' + x.status + ': ' + x.statusText}});
          }
        }else{
          /* Enviamos peticion *EDITAR* a la API */
          let x = await Contrasenas.update(this.mp, this.id, this.state.passwordName, this.state.password,
            this.state.expirationTime, this.state.passwordCategoryId,
            this.state.optionalText, this.state.userName);
          /* Comprobamos respuesta de la API */
          if (x.status === 200){
            e = new CustomEvent('PandoraAlert', { 'detail': {
              code:2,
              text:'Contraseña modificada con éxito :)'}});
          }else{
            e = new CustomEvent('PandoraAlert', { 'detail': {
              code:4,
              text: 'Error ' + x.status + ': ' + x.statusText}});
          }
        }
        if (e !== null) {
          window.dispatchEvent(e);
          if (e.detail.code === 2)window.location.reload();
        }
      }
      /* Cerramos el modal */
      this.handleClose();
    }


    render(){
      let titulo;
      let boton;
      if(this.edit===false){
        titulo = "Crea tu nueva contraseña";
        boton = "Crear contraseña";
      }else{
        titulo = "Edita tu contraseña";
        boton = "Guardar cambios";
      }
      return(
        <div className="newpass">
            <h1>{titulo}</h1>
            <form id="newpassform" onSubmit={this.handleSubmit} >
              <div className="input-group">
                <label className={this.state.passwordName!=="" ? "label-active":null}>
                  Nombre
                </label>
                <input type="text" name="name" value={this.state.passwordName}
                  onChange={this.handleChangeName} required
                />
              </div>
              <div className="input-group">
                <label className={this.state.userName!=="" ? "label-active":null}>
                  Usuario
                </label>
                <input type="text" name="user" value={this.state.userName}
                  onChange={this.handleChangeUser}
                />
              </div>
              <div className="input-group">
                <label className={this.state.password!=="" ? "label-active":null}>
                  Contraseña
                </label>
                <input type="text" name="pass" value={this.state.password}
                  onChange={this.handleChangePass} required
                />
              </div>
              <div className="input-group">
                <label>
                  Días de expiración
                </label>
                <input type="number" name="time" min="1" max="600"
                  value={this.state.expirationTime}
                  onChange={this.handleChangeTime}
                />
              </div>
              <div className="input-group cat">
              <label>
                Categoría
              </label>
                <select name="catt" value={this.state.passwordCategoryId}
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
                <textarea type="text" name="text" value={this.state.optionalText}
                  onChange={this.handleChangeText}
                />
              </div>
              <div className="input-group">
                <button type="submit" className="btn">
                  {boton}
                </button>
              </div>
            </form>
        </div>

      )
    }

}

export default NewPass;
