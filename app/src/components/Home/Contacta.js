import React,{Component} from 'react';
import './Contacta.css';
import { ContactaAgent } from '../../agent';

class Contacta extends Component{
    constructor(props){
        super(props);
        this.state = {
            correo: "",
            mensaje: ""
        };
        this.handleChangeCorreo = this.handleChangeCorreo.bind(this);
        this.handleChangeMensaje = this.handleChangeMensaje.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChangeCorreo(event) {
        this.setState({ correo: event.target.value });
      }
      handleChangeMensaje(event) {
        this.setState({ mensaje: event.target.value });
      }

      async handleSubmit(event) {
        event.preventDefault();
        console.log('Login:{correo:', this.state.correo, ";mensaje:", this.state.mensaje, "}");
        await ContactaAgent.contacta(this.state.correo, this.state.mensaje);
      }


    render(){
        return(
            <div className="card card-form">
             <form onSubmit={this.Contacta} className="card-body">

                <h1>Contacta con nosotros</h1>

                <div className={"input-contacta contacta-position-1"}>
                  <input
                  type="text"
                  name="Correo"
                  value={this.state.correo}
                  onChange={this.handleChangeCorreo}
                  placeholder="Correo:"
                  />
                </div>

                <div className={"input-contacta contacta-position-2"}>
                  <textarea
                  type="text"
                  name="Mensaje"
                  value={this.state.mensaje}
                  onChange={this.handleChangeMensaje}
                  placeholder="Mensaje:"
                  />
                </div>



                <button type="submit" className="contacta-button">
                Enviar
                </button>

             </form>
            </div>
        )
    }
}

export default Contacta;
