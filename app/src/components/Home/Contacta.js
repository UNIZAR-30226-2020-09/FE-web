import React from 'react';
import { history, mailValidation } from '../../utils';
import { ContactaAgent } from '../../agent';
import './Contacta.css';


class Contacta extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          mail: "",
          body: ""
      };
      this.handleChangeMail = this.handleChangeMail.bind(this);
      this.handleChangeBody = this.handleChangeBody.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeMail(event) {
      this.setState({ mail: event.target.value });
    }
    handleChangeBody(event) {
      this.setState({ body: event.target.value });
    }

    async handleSubmit(event) {
      event.preventDefault();
      if (mailValidation(this.state.mail)){
        let x = await ContactaAgent.contactar(this.state.mail, this.state.body);
        console.log(x);
        if (x.http_status === 200){
        }else{
          window.alert('Error ' + x.http_status + '\n' + x.text);
        }
      }else{
        window.alert('Email no válido');
      }
    }


    render(){
      return(
        <div className="contacta">

          <div className="contacta-box">
            <h1>Contácta con nosotros</h1>
            <form onSubmit={this.handleSubmit} >
              <div className="input-group">
                <label className={this.state.mail!=="" ? "label-active":null}>
                  Correo:
                </label>
                <input
                  type="text"
                  name="mail"
                  value={this.state.mail}
                  onChange={this.handleChangeMail}
                />
              </div>
              <div className="input-group">
                <label className={this.state.body!=="" ? "label-active": "textarea-correction"}>
                  Mensaje:
                </label>
                <textarea
                type="text"
                name="body"
                value={this.state.body}
                onChange={this.handleChangeBody}
                />
              </div>
              <div className="input-group">
                <button type="submit" className="btn">
                  <span className="fas"/> Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    }

}

export default Contacta;
