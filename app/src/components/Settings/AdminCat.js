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
  }

  async listar_cat(){
    let x = await Categorias.list();
    //console.log("listar_cat");
    if (x.status === 200) {
      //console.log(x.categories);
      this.cats = x.categories;
      let arr = [];
      for (x in this.cats) arr.push(false);
      this.setState({onedit: arr});
    } else {
      this.cats = [{
        catId: -1,
        categoryName: "ERROR"
      }]
      this.setState( {onedit: [false]} );
    }
    //onsole.log("estado listar:", this.state);
  }

  // TODO: err_feedback ya existe la contra
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
        await Categorias.update(id, event.target.parentElement.childNodes[0].value);
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
        let x = await Categorias.del(id);
        console.log(x);
        this.listar_cat();
        break;
      }
    }
  }

  // TODO: err_feedback ya existe la contra
  async onaddHandler(event){
    if(event.target.className === add){
      this.setState({new:true});
    } else { // Confirmacion o cancelacion con input
      if (event.target.className === ok) { // Mandar categoria
        let new_Cat = event.target.parentElement.childNodes[0].value;
        if (new_Cat.length > 0){
          await Categorias.create(new_Cat);
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
          Administrar categorias
        </div>
        <ul>
          {this.cats.map( (cat, i) =>
            this.state.onedit[i] ?
            <li key={cat.catId} className="slot inner">
              <input type="text" defaultValue={cat.categoryName}/>
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
              <input type="text" placeholder="Añadir categoria . . ." required/>
              <span className={ok} onClick={this.onaddHandler.bind(this)}/>
              <span className={quit} onClick={this.onaddHandler.bind(this)}/>
            </li>
            :
            <li key={0} className="slot inner">
              <i>Añadir categoria . . .</i>
              <span className={add} onClick={this.onaddHandler.bind(this)}/>
            </li>
          }
        </ul>
      </div>
    );
  }
}

export default (AdminCat);
