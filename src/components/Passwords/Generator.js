import React from 'react';
import {Contrasenas} from '../../agent';
import './Generator.css';
import PropTypes from 'prop-types'

class Generator extends React.Component{
    constructor(props){
        super(props);
        this.handleGen=props.handleGen;
        this.showGenerator=props.showGenerator;

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
        var e = null;
        let x = await Contrasenas.gen(this.state.minus,this.state.mayus,
            this.state.numbers,this.state.specialCharacters,this.state.length);
        console.log(x);
        if (x.status === 200){
            this.handleGen(x.password);
        }
        else{
            e = new CustomEvent('PandoraAlert', { 'detail': {
                code:4,
                text: 'Error ' + x.status + ': ' + x.statusText}});
        }
    }
    render(){
        return(
            <div className="generator">
                <label> <br/> </label>
                <form className="generator-form">
                    <label className = "generator-label">
                        <input name="minus" type="checkbox" checked={this.state.minus} onChange={this.handleChangeCheck} />
                        Minusculas
                    </label>
                    <label className = "generator-label">
                    <input name="mayus" type="checkbox" checked={this.state.mayus} onChange={this.handleChangeCheck} />
                        Mayusculas
                    </label>
                </form>
                <form className="generator-form">
                    <label className = "generator-label">
                        <input name="numbers" type="checkbox" checked={this.state.numbers} onChange={this.handleChangeCheck} />
                        Numeros
                    </label>
                    <label className = "generator-label-car">
                        <input name="specialCharacters" type="checkbox" checked={this.state.specialCharacters} onChange={this.handleChangeCheck} />
                        Caracteres Especiales
                    </label>
                </form>
                <form className="generator-form">
                    <label className = "generator-label">
                        Longitud &nbsp;
                        <input name="length" type="number" min= "4" max ="40" value={this.state.length} onChange={this.handleChangeNum} />
                    </label>
                </form>
                <button onClick={this.showGenerator} className="btn-gen">
                   <span className="fas fa-times" />
                </button>
                <button onClick={this.submitHandle} className="btn-gen-conf">
                   <span className="fas fa-check" />
                </button>
                
            </div>
        )
      }
}

Generator.propTypes = {
    handleGen: PropTypes.func.isRequired,
    showGenerator: PropTypes.func.isRequired
}

export default Generator;