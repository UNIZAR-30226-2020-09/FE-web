import React from 'react';
import {Contrasenas} from '../../agent';
import './Generator.css';
import PropTypes from 'prop-types'

class Generator extends React.Component{
    constructor(props){
        super(props);
        this.handleGen=props.handleGen;

        this.state ={
            minus: true,
            mayus: true,
            numbers: true,
            specialCharacters: true,
            length: 4
        };
        this.handleChangeCheck=this.handleChangeCheck.bind(this);
        this.handleChangeNum=this.handleChangeNum.bind(this);
        this.submitHandle=this.submitHandle.bind(this);
    }

    handleChangeCheck(event){
        const target = event.target;
        const value = target.checked;
        const name = target.name;
        this.setState({[name]: value});
    }
    handleChangeNum(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    async submitHandle(event){
        event.preventDefault();
        var cont = 0;
        var e = null;
        if(this.state.minus === true) cont++;
        if(this.state.mayus === true) cont++;
        if(this.state.numbers === true) cont++;
        if(this.state.specialCharacters === true) cont++;
        if(cont===0){
          e = new CustomEvent('PandoraAlert', { 'detail': {
              code: 4,
              text: 'Debe marcar al menos una casilla'}});
          window.dispatchEvent(e);
        }else if(cont > this.state.length){
          e = new CustomEvent('PandoraAlert', { 'detail': {
              code: 4,
              text: 'La longitud debe ser igual o mayor al número de casillas marcadas'}});
          window.dispatchEvent(e);
        }else{
          let x = await Contrasenas.gen(this.state.minus,this.state.mayus,
              this.state.numbers,this.state.specialCharacters,this.state.length);
          //console.log(x);
          if (x.status === 200){
              this.handleGen(x.password);
          }
          else{
              e = new CustomEvent('PandoraAlert', { 'detail': {
                  code:4,
                  text: 'Error ' + x.status + ': ' + x.statusText}});
              if (e !== null) {
                window.dispatchEvent(e);
              }
          }
        }
    }

    render(){
        return(
            <div className="row generator">
              <div className="column col-50">
                <div className="input-group">
                    <input name="minus" type="checkbox" checked={this.state.minus} onChange={this.handleChangeCheck} />
                    <label>Letras minúsculas</label>
                </div>
                <div className="input-group">
                    <input name="mayus" type="checkbox" checked={this.state.mayus} onChange={this.handleChangeCheck} />
                    <label>Letras mayúsculas</label>
                </div>
                <div className="input-group">
                    <input name="length" type="number" min="4" max ="40" value={this.state.length} onChange={this.handleChangeNum} />
                    <label>Longitud</label>
                </div>
              </div>
              <div className="column col-50">
                <div className="input-group">
                    <input name="numbers" type="checkbox" checked={this.state.numbers} onChange={this.handleChangeCheck} />
                    <label>Carácteres numéricos</label>
                </div>
                <div className="input-group">
                    <input name="specialCharacters" type="checkbox" checked={this.state.specialCharacters} onChange={this.handleChangeCheck} />
                    <label>Carácteres especiales</label>
                </div>
                <button onClick={this.submitHandle} className="btn-gen">
                   Generar Contraseña
                </button>
              </div>
            </div>
        )
      }
}

Generator.propTypes = {
    handleGen: PropTypes.func.isRequired
}

export default Generator;
