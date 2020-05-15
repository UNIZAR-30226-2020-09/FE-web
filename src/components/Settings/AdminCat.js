import React from 'react';
import './AdminCat.css';
import { Categorias } from '../../agent';

const edit = "fas fa-pen";
const del = "fas fa-trash-alt";
const ok = "fas fa-check";
const quit = "fas fa-times";
const add = "fas fa-plus";

class AdminCat extends React.Component {
  constructor(props) {
    super(props);
    this.cats = [];
    this.listar_cat();
    this.state = {
     new: false,
     onedit: []
    };
    this.inputEnter = function(event){
      if (event.key === 'Enter') {
        let span_ok = event.target.nextElementSibling;
        span_ok.click();
      }
      return;
    }
  }

  async listar_cat(){
    let x = await Categorias.list();
    //console.log("listar_cat");
    if (x.status === 200) {
      this.cats = x.categories;
      var i;
      for( i = 0; i < this.cats.length; i++) if ( this.cats[i].categoryName === "Sin categoría") this.cats.splice(i, 1);
      for( i = 0; i < this.cats.length; i++) if ( this.cats[i].categoryName === "Compartida") this.cats.splice(i, 1);
      let arr = [];
      for (x in this.cats) arr.push(false);
      this.setState({onedit: arr});
    } else {
      this.cats = [{
        catId: -1,
        categoryName: "ERROR"
      }]
      this.setState( {onedit: [false]} );
      var e = new CustomEvent('PandoraAlert', { 'detail': {code:5, text:'No se han podido recuperar las categorías.'} });
      window.dispatchEvent(e);
    }
    //onsole.log("estado listar:", this.state);
  }

  async oneditHandler(event, id){
    // Obtener categoria
    let cat;
    for (cat in this.cats){
      if (this.cats[cat].catId === id){
        break;
      }
    }
    let b_edit = this.state.onedit[cat];
    let cpy = this.state.onedit;
    if (event.target.className !== quit) {
      if (b_edit) { //MANDAR A BASE DE DATOS CAMBIO
        var e = null, txt = event.target.parentElement.childNodes[0].value;
        let x = await Categorias.update(id, txt);
        if (x.status === 200) {
          e = new CustomEvent('PandoraAlert', { 'detail': {code:1, text:'Se ha editado la categoría "' + txt + '".'} });
        } else {
          e = new CustomEvent('PandoraAlert', { 'detail': {
            code: 4,
            text: 'Error ' + x.status + ': ' + x.statusText
          }});
        }
        if (e !== null) window.dispatchEvent(e);
        this.listar_cat();
        return;
      }
      if (cpy.filter(Boolean).length > 0) {
        cpy = cpy.map( (a) => false);
      };// quitar los otros edit!
      cpy[cat] = !b_edit;
      this.setState({onedit : cpy});
    } else {
      cpy[cat] = !b_edit;
      this.setState({onedit : cpy});
    }
  }

  async ondeleteHandler(event, id){
    let cat;
    for (cat in this.cats){
      if (this.cats[cat].catId === id){
        console.log(id);
        let x = await Categorias.del(id);
        console.log(x);
        var e = null;
        if (x.status === 200) {
          e = new CustomEvent('PandoraAlert', { 'detail': {
            code: 2,
            text:'Se ha eliminado la categoría ' + this.cats[cat].categoryName
          }});
        } else {
          e = new CustomEvent('PandoraAlert', { 'detail': {
            code: 4,
            text: 'Error ' + x.status + ': ' + x.statusText
          }});
        }
        if (e !== null) window.dispatchEvent(e);
        this.listar_cat();
        break;
      }
    }
  }

  async onaddHandler(event){
    if(event.target.className === add){
      this.setState({new:true});
    } else { // Confirmacion o cancelacion con input
      if (event.target.className === ok) { // Mandar categoria
        let new_Cat = event.target.parentElement.childNodes[0].value;
        if (new_Cat.length > 0){
          let x = await Categorias.create(new_Cat);
          var e = null;
          if (x.status === 200) {
            e = new CustomEvent('PandoraAlert', { 'detail': {
              code: 2,
              text:'Se ha creado la categoría ' + new_Cat
            }});
          } else {
            e = new CustomEvent('PandoraAlert', { 'detail': {
              code: 4,
              text: 'Error ' + x.status + ': ' + x.statusText
            }});
          }
          if (e !== null) window.dispatchEvent(e);
          this.listar_cat();
        }
      }
      this.setState({new:false});
    }
  }

  render(){
    return (
      <div className="categorias">
        <div className="slot title">
          Administrar categorías
        </div>
        <ul>
          {this.cats.map( (cat, i) =>
            this.state.onedit[i] ?
            <li key={cat.catId} className="slot inner">
              <input type="text" maxLength="30" defaultValue={cat.categoryName} onKeyUp={this.inputEnter} required/>
              <span className={ok} onClick={(e) => this.oneditHandler(e,cat.catId)}/>
              <span className={quit} onClick={(e) => this.oneditHandler(e,cat.catId)}/>
            </li>
            :
            <li key={cat.catId} className="slot inner">
              <i>{cat.categoryName}</i>
              <span className={edit} onClick={(e) => this.oneditHandler(e,cat.catId)}/>
              <span className={del} onClick={(e) => this.ondeleteHandler(e,cat.catId)}/>
            </li>
          )}
          {this.state.new ?
            <li key={0} className="slot inner">
              <input type="text" maxLength="30" placeholder="Nueva categoría..." onKeyUp={this.inputEnter} required/>
              <span className={ok} onClick={this.onaddHandler.bind(this)}/>
              <span className={quit} onClick={this.onaddHandler.bind(this)}/>
            </li>
            :
            <li key={0} className="slot inner">
              <i>Nueva categoría...</i>
              <span className={add} onClick={this.onaddHandler.bind(this)}/>
            </li>
          }
        </ul>
      </div>
    );
  }
}

export default (AdminCat);
