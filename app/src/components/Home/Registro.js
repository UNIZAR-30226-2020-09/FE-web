import React,{Component} from 'react';
import './Registro.css';

class Registro extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            confirm: ""
        };
        this.InputChange = this.InputChange.bind(this);
        this.Register = this.Register.bind(this);
    }

    InputChange(event){
      const {value,name} = event.target;
      this.setState({
          [name]: value
      });
    }

    Register(event){
        console.log(this.state);
        //event.preventDefault();
        if(this.state.Contraseña !== this.state.Confirmar){
            window.confirm('Las contraseñas no coinciden');
        }
        // Habria que comprobar si el correo ya existe en la base de datos
        else{
            window.confirm('Te has registrado satisfactoriamente');
        }
    }


    render(){
      return(
        <div className="registro">
          <div className="box">
            <h1>Registrate</h1>
            <form onSubmit={this.Register}>
              <div className="input-group">
                <label className={this.state.email!=="" ? "label-active":null}>
                  Correo:
                </label>
                <input type="text" name="email"
                  value={this.state.email} onChange={this.InputChange}/>
              </div>
              <div className="input-group">
                <label className={this.state.password!=="" ? "label-active":null}>
                  Contraseña:
                </label>
                <input type="text" name="password"
                  value={this.state.password} onChange={this.InputChange}/>
              </div>
              <div className="input-group">
                <label className={this.state.confirm!=="" ? "label-active":null}>
                  Repetir contraseña:
                </label>
                <input type="text" name="confirm"
                  value={this.state.confirm} onChange={this.InputChange}/>
              </div>
              <div className="input-group">
                <button type="submit" className="btn">
                  <span className="fas fa-sign-in-alt"/> Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
}

export default Registro;
