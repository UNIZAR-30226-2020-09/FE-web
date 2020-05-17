import React from 'react';
import { Contrasenas, Categorias, Grupales } from '../../agent';
import './NewPass.css';
import Generator from './Generator.js';
import Compartir from './Compartir.js';

class NewPass extends React.Component {
    constructor(props){
      super(props);
      this.handleClose = props.handleClose;//para cerrar modal
      this.mp = props.mp;//masterPassword
      this.getEdit = props.edit;//contraseña que ha sido pulsada
      this.listarC = props.listar;

      this.listar_cat();
      this.state = {
          passwordName: '',
          password: '',
          expirationTime: 120,
          passwordCategoryId: 0,
          categoryName: '',
          optionalText: '',
          userName: '',
          rol: 0,
          usuarios: [],
          generadorAbierto: false,
          compartirAbierto: false,
          botonOculto:false
      };
      this.id = 0;//id contraseña
      this.edit = false;//edit o create
      this.catsCompletas = [];
      this.cats = [];//para listar categorías en desplegable

      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangePass = this.handleChangePass.bind(this);
      this.handleChangeUser = this.handleChangeUser.bind(this);
      this.handleChangeTime = this.handleChangeTime.bind(this);
      this.handleChangeCat = this.handleChangeCat.bind(this);
      this.handleChangeText = this.handleChangeText.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.showGenerator = this.showGenerator.bind(this);
      this.showCompartir = this.showCompartir.bind(this);
      this.getUsers = this.getUsers.bind(this);
      this.setNewUser = this.setNewUser.bind(this);
      this.delUser = this.delUser.bind(this);
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
        categoryName: ed.categoryName,
        passwordCategoryId: ed.catId,
        optionalText: ed.optionalText,
        userName: ed.userName,
        rol: ed.rol,
        usuarios: []
      });
      this.id = ed.passId;
      this.edit = true;
      if(ed.categoryName==="Compartida") this.setState({usuarios: ed.usuarios});
      /* Cerramos el generador */
      if(this.state.generadorAbierto === true){
        this.showGenerator();
      }
      /* Cerramos/Abrimos el compartir */
      if((this.state.usuarios.length===0 & this.state.compartirAbierto===true)
      |(this.state.usuarios.length>0 & this.state.compartirAbierto===false)) {
        this.showCompartir();
      }
    }

    setNew() {
      this.setState({
        passwordName: '',
        password: '',
        expirationTime: 120,
        categoryName: '',
        passwordCategoryId: this.cats[0].catId,
        optionalText: '',
        userName: '',
        rol: 0,
        usuarios: []
      });
      this.id = 0;
      this.edit = false;
      /* Cerramos el generador */
      if(this.state.generadorAbierto === true){
        this.showGenerator();
      }
      /* Cerramos/Abrimos el compartir */
      if(this.state.compartirAbierto===true){
        this.showCompartir();
      }
    }

    async listar_cat(){
      /* Pedimos categorías a la API */
      let x1 = await Categorias.list();
      if (x1.status === 200){
        let j = 0;
        var x2 = [];
        for (let i = 0; i < x1.categories.length; i++) {
          if(x1.categories[i].categoryName !== "Compartida"){
            x2[j]=x1.categories[i];
            j++;
          }
        }
        this.cats = x2;
        this.catsCompletas = x1.categories;
        this.setState({ passwordCategoryId: this.cats[0].catId });
      }else{
        this.cats = [{catId: -1,categoryName: "ERROR"}]
      }
    }

    async handleSubmit(event) {
      event.preventDefault();
      var e = null, e2 = null;
      let x = null;
      if(this.edit===false){
        /* Enviamos peticion *CREAR* a la API */
        if(this.state.usuarios.length > 0){
          x = await Grupales.create(this.state.passwordName, this.state.password,
            this.state.expirationTime, this.state.passwordCategoryId,
            this.state.optionalText, this.state.userName, this.state.usuarios);
          if(x.usuariosErroneos.length > 0){
            e2 = new CustomEvent('PandoraAlert', { 'detail': {
              code:2,
              text:'Usuario(s) no existente(s): '+ x.usuariosErroneos}});
            if (e2 !== null)window.dispatchEvent(e2);
          }
        }else{
          x = await Contrasenas.create(this.mp, this.state.passwordName, this.state.password,
            this.state.expirationTime, this.state.passwordCategoryId,
            this.state.optionalText, this.state.userName);
        }
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
        if(this.state.usuarios.length > 0){
           if(this.state.categoryName ==="Compartida"){
            x = await Grupales.modify(this.id,this.state.passwordName,
              this.state.password,this.state.expirationTime,this.state.optionalText,this.state.userName,
              this.state.usuarios);
           }
           else{
             x = await Contrasenas.del(this.id);
             if (x.status === 200){
              x = await Grupales.create(this.state.passwordName, this.state.password,
                this.state.expirationTime, this.state.passwordCategoryId,
                this.state.optionalText, this.state.userName, this.state.usuarios);
             }
            else{
              e = new CustomEvent('PandoraAlert', { 'detail': {
                code:4,
                text: 'Error ' + x.status + ': ' + x.statusText}});
             }
           }
        }else{
          if(this.state.categoryName==="Compartida"){
            await this.setState({ passwordCategoryId: this.cats[0].catId});
            //console.log("GROUP TO INDIVIDUAL MODIFICATION",this.state.passwordCategoryId);
          }else{
            //console.log("INDIVIDUAL TO INDIVIDUAL MODIFICATION",this.state.passwordCategoryId);
          }
          x = await Contrasenas.update(this.mp, this.id, this.state.passwordName, this.state.password,
            this.state.expirationTime, this.state.passwordCategoryId,
            this.state.optionalText, this.state.userName);
        }
        /* Comprobamos respuesta de la API */
        if (x.status === 200){
          e = new CustomEvent('PandoraAlert', { 'detail': {
            code:2,
            text:'Contraseña modificada con éxito.'}});
        }else{
          e = new CustomEvent('PandoraAlert', { 'detail': {
            code:4,
            text: 'Error ' + x.status + ': ' + x.statusText}});
        }
      }
      if (e !== null) {
        window.dispatchEvent(e);
        if (e.detail.code === 2){
          this.listarC(true);
          this.listarC(true);
        }
      }
      /* Cerramos el modal */
      this.handleClose();
      /* Cerramos el generador */
      if(this.state.generadorAbierto === true){
        this.showGenerator();
      }
    }

    async showGenerator(){
      let x = this.state.generadorAbierto;
      this.setState({ generadorAbierto: !x });
      var generator=document.getElementById("generatorForm");
      generator.classList.toggle("generator-show");
      var all=document.getElementById("newpassForm");
      if(this.state.compartirAbierto===true){
        all.classList.toggle("newpass-gen-comp-on");
      }else{
        all.classList.toggle("newpass-gen-on");
      }
    }

    async showCompartir(){
      let x = this.state.compartirAbierto;
      this.setState({ compartirAbierto: !x });
      var generator=document.getElementById("compartirForm");
      generator.classList.toggle("compartir-show");
      var all=document.getElementById("newpassForm");
      if(this.state.generadorAbierto===true){
        all.classList.toggle("newpass-gen-comp-on");
      }else{
        all.classList.toggle("newpass-comp-on");
      }
    }

    handleGen = (pass) => {
      this.setState({ password: pass});
    }

    getUsers() {
      return this.state.usuarios;
    }
    setNewUser(user){
      var x = this.state.usuarios.concat(user);
      this.setState({ usuarios: x });
    }
    delUser(user){
      var x1 = this.state.usuarios;
      var x2 = [];
      var j = 0;
      for (let i = 0; i < x1.length; i++) {
        if(x1[i] !== user){
          x2[j]=x1[i];
          j++;
        }
      }
      this.setState({ usuarios: x2 });
    }

    render(){
      let titulo;
      let boton;
      if(this.edit){
        titulo = "Edita tu contraseña";
        boton = "Guardar cambios";
      }else{
        titulo = "Crea tu nueva contraseña";
        boton = "Crear contraseña";
      }
      var noeditcat = false;
      if(this.state.categoryName === "Compartida") noeditcat = true;
      var cats = this.cats;
      if(this.state.categoryName === "Compartida") cats = this.catsCompletas;
      return(
        <div className="newpass" id="newpassForm">
            <h1>{titulo}</h1>
            <form onSubmit={this.handleSubmit} >
              <div className="input-group">
                <label className={this.state.passwordName!=="" ? "label-active":null}>
                  Nombre
                </label>
                <input type="text" maxLength="30" name="name" value={this.state.passwordName}
                  onChange={this.handleChangeName} required
                />
              </div>
              <div className="input-group">
                <label className={this.state.userName!=="" ? "label-active":null}>
                  Usuario
                </label>
                <input type="text" maxLength="30" name="user" value={this.state.userName}
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
              <div className="input-group btn-generar">
                <button type="button" onClick={this.showGenerator} className="btn">
                  Generar contraseña robusta
                </button>
              </div>
              <div className="generator-default" id ="generatorForm">
                <Generator handleGen={this.handleGen}/>
              </div>
              <div className="input-group">
                <label>
                  Días de expiración
                </label>
                <input type="number" name="time" min="1" max="365"
                  value={this.state.expirationTime}
                  onChange={this.handleChangeTime}
                />
              </div>
              <div className="input-group cat">
              <label>
                Categoría
              </label>
                <select name="catt" value={this.state.passwordCategoryId}
                  onChange={this.handleChangeCat} disabled={noeditcat}>
                  {cats.map( (cat, i) =>
                    <option key={i} value={cat.catId}>{cat.categoryName}</option>
                  )}
                </select>
              </div>
              <div className="input-group">
                <label className={this.state.optionalText!=="" ? "label-active": "textarea-correction"}>
                  Texto opcional
                </label>
                <textarea type="text" maxLength="100" name="text" value={this.state.optionalText}
                  onChange={this.handleChangeText}
                />
              </div>
              <div className="input-group btn-compartir" id="sharebutt">
                <button type="button" onClick={this.showCompartir} className="btn">
                  Compartir contraseña
                </button>
              </div>
              <div className="compartir-default" id ="compartirForm">
                <Compartir ref="share" getUsers={this.getUsers} setNewUser={this.setNewUser} delUser={this.delUser}/>
              </div>
              <div className="input-group">
                <button type="submit" className="btn btn-submit">
                  {boton}
                </button>
                <button type="button" onClick={this.handleClose} className="btn btn-cancel">
                    Cancelar
                </button>
              </div>
            </form>
        </div>

      )
    }

}

export default NewPass;
