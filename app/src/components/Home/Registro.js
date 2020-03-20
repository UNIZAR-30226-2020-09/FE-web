import React,{Component} from 'react';
import './Registro.css';

class Registro extends Component{
    constructor(props){
        super(props);
        this.state = {
            Correo: "",
            Contraseña: "",
            Confirmar: ""
        };
        this.InputChange = this.InputChange.bind(this);
        this.Register = this.Register.bind(this);
    }

    InputChange(event){
      const {value,name} = event.target;
      console.log(value,name);
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
            <div className="card card-form">
             <form onSubmit={this.Register} className="card-body">
                <div className="form-group group-form">
                  <input
                   type="text"
                   name="Correo"
                   className="form-control form-select"
                   value={this.state.correo}
                   onChange={this.InputChange}
                   placeholder="Correo:"
                  />
                </div>  
                <div className="form-group group-form">
                 <input
                  type="text"
                  name="Contraseña"
                  className="form-control form-select"
                  value={this.state.contra}
                  onChange={this.InputChange}
                  placeholder="Contraseña:"
                 />
                </div>
                <div className="form-group group-form">
                 <input
                  type="text"
                  name="Confirmar"
                  className="form-control form-select"
                  value={this.state.contraRep}
                  onChange={this.InputChange}
                  placeholder="Confirme Contraseña:"
                 />
                </div>
                <button type="submit" className="btn button-form">
                <a>
                    <span className="fas fa-sign-in-alt"/> Registrarse
                </a>
                </button>
             </form>
            </div>
        )
    }
}

export default Registro;